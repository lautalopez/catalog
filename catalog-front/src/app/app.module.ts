import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './layout/components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { UserProfileComponent } from './layout/user-profile/user-profile.component';
import { TableListComponent } from './layout/table-list/table-list.component';
import { TypographyComponent } from './layout/typography/typography.component';
import { IconsComponent } from './layout/icons/icons.component';
import { MapsComponent } from './layout/maps/maps.component';
import { NotificationsComponent } from './layout/notifications/notifications.component';
import { UpgradeComponent } from './layout/upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layout/main/admin-layout/admin-layout.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
