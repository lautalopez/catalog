import {NgModule, Optional, SkipSelf} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './state';
import * as Products from './collections/products';
import {CollectionStoreModule} from '../ngrx-collections/collection-store.module';
import {AppEffects} from './effects';
import {ProductStoreModule} from './products/product-store.module';

function throwIfAlreadyLoaded(parentModule: any, moduleName: string): void {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import ${moduleName} in the AppModule only.`);
    }
}

@NgModule({
    declarations: [],
    imports: [
        CollectionStoreModule.forCollections([
            Products.collectionStoreDataFactory
        ]),
        ProductStoreModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot([AppEffects])
    ]
})
export class AppStoreModule {

    constructor(@Optional() @SkipSelf() parentModule: AppStoreModule) {

        throwIfAlreadyLoaded(parentModule, 'AppStoreModule');
    }
}
