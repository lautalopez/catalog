import {Product} from '../../models/product.model';

export interface ProductsState {
    items: Product[];
}

export const initialState: ProductsState = {
    items: []
}
