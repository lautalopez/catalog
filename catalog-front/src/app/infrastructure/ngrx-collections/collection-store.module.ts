import { NgModule, ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ReducerManager } from '@ngrx/store';
import { CollectionsRegistry, CollectionStoreDataFactory } from './collection-registry';
import { COLLECTION_STORE_DATA_FACTORIES } from './collection-store-data-factories';
import { CollectionEffects } from './collection-effects';

@NgModule({
  declarations: [],
  imports: [
    EffectsModule.forFeature([CollectionEffects])
  ]
})
export class CollectionStoreModule {

  static forCollections(collectionsFactories: CollectionStoreDataFactory[]): ModuleWithProviders<CollectionStoreModule> {
    return {
        ngModule: CollectionStoreModule,
        providers: [
            { provide: COLLECTION_STORE_DATA_FACTORIES, multi: true, useValue: collectionsFactories },
        ]
    };
}

  constructor(reducerManager: ReducerManager, registry: CollectionsRegistry) {
    registry.collectionsData.forEach(data => {
      reducerManager.addFeature({
        key: data.name,
        initialState: data.adapter.getInitialState(),
        reducers: data.reducer,
        // tslint:disable-next-line:no-non-null-assertion
        reducerFactory: null!
      });
    });
  }
}
