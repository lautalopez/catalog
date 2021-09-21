import { Injectable, Inject } from '@angular/core';
import { CollectionStoreData } from './entity-state-support';
import { COLLECTION_STORE_DATA_FACTORIES } from './collection-store-data-factories';

export type CollectionStoreDataFactory = () => CollectionStoreData;

@Injectable({ providedIn: 'root' })
export class CollectionsRegistry {

  collectionsData: CollectionStoreData[];

  constructor(@Inject(COLLECTION_STORE_DATA_FACTORIES) collectionsDataFactories: CollectionStoreDataFactory[][]) {
    this.collectionsData = ([] as CollectionStoreDataFactory[]).concat(...collectionsDataFactories).map(factory => factory());
  }

  get(name: string): CollectionStoreData {
    return this.collectionsData.filter(x => x.name === name)[0];
  }
}
