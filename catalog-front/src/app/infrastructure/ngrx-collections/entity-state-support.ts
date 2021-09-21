import { createEntityAdapter, Dictionary, EntityAdapter, EntityState as NgrxEntityState, IdSelector, Comparer } from '@ngrx/entity';
import { Action, createAction, createFeatureSelector, createReducer, createSelector, MemoizedSelector, on } from '@ngrx/store';
import { FunctionWithParametersType, TypedAction } from '@ngrx/store/src/models';

// tslint:disable: max-line-length

type IdType = string | number;

export enum EntityOp {
  ENSURE_LOADED,
  LOAD,
  LOAD_SUCCESS,
  UPSERTED,
  DELETED,
  UNLOAD
}

export interface EntityAction extends Action {
  op: EntityOp;
  collectionName: string;
}

export interface BaseCollectionState {
  ids: string[] | number[];
  loading: boolean;
  lastUpdate: Date;
}

export interface CollectionState<T> extends NgrxEntityState<T>, BaseCollectionState {
  loading: boolean;
  lastUpdate: Date;
}

export interface CollectionActions<TEntity> {
  load: FunctionWithParametersType<[], EntityAction & {} & TypedAction<string>> & TypedAction<string>;
  ensureLoaded: FunctionWithParametersType<[], EntityAction & {} & TypedAction<string>> & TypedAction<string>;
  loadSuccess: FunctionWithParametersType<[TEntity[]], EntityAction & { items: TEntity[] } & TypedAction<string>> & TypedAction<string>;
  upserted: FunctionWithParametersType<[TEntity], EntityAction & { item: TEntity } & TypedAction<string>> & TypedAction<string>;
  deleted: FunctionWithParametersType<[string], EntityAction & { id: string } & TypedAction<string>> & TypedAction<string>;
  unload: FunctionWithParametersType<[], EntityAction & {} & TypedAction<string>> & TypedAction<string>;
}

export interface EntitySelectors<T> {
  selectState: MemoizedSelector<object, CollectionState<T>>;
  selectAllById: MemoizedSelector<object, Dictionary<T>>;
  selectAll: MemoizedSelector<object, T[]>;
  selectCount: MemoizedSelector<object, number>;
  selectLoading: MemoizedSelector<object, boolean>;
}

export function createEntityActions<T>(collectionName: string, tag: string): CollectionActions<T> {
  return {
    load: createAction(`[${tag}] Load`, () => ({ collectionName, op: EntityOp.LOAD })),
    ensureLoaded: createAction(`[${tag}] Ensure loaded`, () => ({ collectionName, op: EntityOp.ENSURE_LOADED })),
    loadSuccess: createAction(`[${tag}] Load success`, (items: T[]) => ({ collectionName, op: EntityOp.LOAD_SUCCESS, items })),
    upserted: createAction(`[${tag}] Upserted`, (item: T) => ({ collectionName, op: EntityOp.UPSERTED, item })),
    deleted: createAction(`[${tag}] Deleted`, (id: string) => ({ collectionName, op: EntityOp.DELETED, id })),
    unload: createAction(`[${tag}] Unload`, () => ({ collectionName, op: EntityOp.UNLOAD })),
  };
}

// tslint:disable-next-line:typedef
export function createEntitySelectors<T>(collectionName: string, adapter: EntityAdapter<T>) {

  const selectState = createFeatureSelector<CollectionState<T>>(collectionName);
  const selectors = adapter.getSelectors();

  return {
    selectState,
    selectAllById: createSelector(selectState, selectors.selectEntities),
    selectAll: createSelector(selectState, selectors.selectAll),
    selectCount: createSelector(selectState, selectors.selectTotal),
    selectLoading: createSelector(selectState, s => s.loading)
  };
}

export type ReducerFn<T> = (state: CollectionState<T> | undefined, action: Action) => NgrxEntityState<T>;

export function createEntityReducer<T>(entityActions: CollectionActions<T>, adapter: EntityAdapter<T>): ReducerFn<T> {

  const reducer = createReducer(
    adapter.getInitialState(),
    on(entityActions.load, (state) => {
      return { ...state, loading: true };
    }),
    on(entityActions.loadSuccess, (state, { items }) => {
      return { ...adapter.setAll(items, adapter.removeAll(state)), loading: false, lastUpdate: new Date() };
    }),
    on(entityActions.upserted, (state, { item }) => {
      return { ...adapter.upsertOne(item, state), loading: false };
    }),
    on(entityActions.deleted, (state, { id }) => {
      return { ...adapter.removeOne(id, state), loading: false };
    }),
    on(entityActions.unload, state => {
      return adapter.removeAll(state);
    })
  );

  return (state: CollectionState<T> | undefined, action: Action) => reducer(state, action);
}

export function createCollectionStoreData<T>(collectionName: string, tag: string, options?: {
  selectId?: IdSelector<T>;
  sortComparer?: false | Comparer<T>;
}): CollectionStoreData<T> {

  const adapter = createEntityAdapter<T>(options);
  const actions = createEntityActions<T>(collectionName, tag);

  return {
    name: collectionName,
    adapter,
    actions,
    selectors: createEntitySelectors<T>(collectionName, adapter),
    reducer: createEntityReducer<T>(actions, adapter)
  };
}

export interface CollectionStoreData<TEntity = any> {
  name: string;
  adapter: EntityAdapter<TEntity>;
  actions: CollectionActions<TEntity>;
  selectors: EntitySelectors<TEntity>;
  reducer: ReducerFn<TEntity>;
}
