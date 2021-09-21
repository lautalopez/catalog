import {Action, createReducer, on} from '@ngrx/store';
import * as Actions from './actions';
import {initialState, ProductsState} from './state';
import {Guid} from 'guid-typescript';

const productReducer = createReducer<ProductsState>(
    initialState,
    on(Actions.Add, (state, {product}) => {
        product.id = Guid.create();
        return {items: [...state.items, product]};
    }),
    on(Actions.Delete, (state, {id}) => {
        return {items: state.items.filter(prod => !prod.id.equals(id))}
    })
);

// tslint:disable-next-line:typedef
export function reducer(state: ProductsState | undefined, action: Action) {
    return productReducer(state, action);
}
