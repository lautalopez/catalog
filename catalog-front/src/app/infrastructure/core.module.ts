import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppStoreModule} from './store/app-store.module';

function throwIfAlreadyLoaded(parentModule: any, moduleName: string): void {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        HttpClientModule,
        AppStoreModule
    ],
    providers: []
})
export class CoreModule {
    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
