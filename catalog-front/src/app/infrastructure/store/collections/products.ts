import {CollectionStoreData, createCollectionStoreData} from '../../ngrx-collections/entity-state-support';
import {Product} from '../../models/product.model';


const collectionStoreData = createCollectionStoreData<Product>('products', 'Products');

export function collectionStoreDataFactory(): CollectionStoreData<Product> {
    return collectionStoreData;
}
export const adapter = collectionStoreData.adapter;
export const actions = collectionStoreData.actions;
export const selectors = collectionStoreData.selectors;
export const reducer = collectionStoreData.reducer;
