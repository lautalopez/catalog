import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions as NgrxActions, createEffect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { OperatorFunction } from 'rxjs';
import { filter, first, map, mergeMap } from 'rxjs/operators';
import { CollectionsRegistry } from './collection-registry';
import { BaseCollectionState, EntityAction, EntityOp } from './entity-state-support';
import {environment} from '../../../environments/environment';

function requiresUpdate(state: BaseCollectionState): boolean {
  if (!state || !state.ids) {
    return false;
  }
  return !state.ids.length
    || !state.lastUpdate
    || (new Date().getDate() - state.lastUpdate.getDate() > 1000 * 60 * 5);
}

function ofEntityOp(op: EntityOp): OperatorFunction<Action, EntityAction>;
function ofEntityOp(op: EntityOp): OperatorFunction<Action, Action> {
  return filter(t => (<EntityAction>t).op === op);
}

@Injectable()
export class CollectionEffects<T> {

  ensureLoaded$ = createEffect(() => this.actions$.pipe(
    ofEntityOp(EntityOp.ENSURE_LOADED),
    mergeMap(a => this.store.pipe(
      first(),
      select(a.collectionName),
      map(s => requiresUpdate(s) ? this.registry.get(a.collectionName).actions.load() : null!),
      filter(a1 => !!a1)
    ))
  ));

  load$ = createEffect(() => this.actions$.pipe(
    ofEntityOp(EntityOp.LOAD),
    map(a => this.registry.get(a.collectionName)),
    mergeMap(coll => this.http.get<T[]>(`${environment.apiUrl}/api/${coll.name}`).pipe(
      map(items => coll.actions.loadSuccess(items))
    ))
  ));

  constructor(
    private http: HttpClient,
    private actions$: NgrxActions,
    private store: Store<any>,
    private registry: CollectionsRegistry) {
  }
}
