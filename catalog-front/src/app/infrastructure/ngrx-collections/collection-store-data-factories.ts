import { InjectionToken } from '@angular/core';
import { CollectionStoreData } from './entity-state-support';

export const COLLECTION_STORE_DATA_FACTORIES = new InjectionToken<CollectionStoreData[]>('COLLECTION_STORE_DATA_FACTORIES');
