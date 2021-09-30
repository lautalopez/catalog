import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {
    AgmCoreModule
} from '@agm/core';
import {CoreModule} from './infrastructure/core.module';

@NgModule({
    imports: [
        CoreModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
/*        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        })*/
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
