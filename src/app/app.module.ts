import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { AddLinkComponent } from './list/add-link/add-link.component';
import { NotificationsComponent } from './helpers/notification/notifications.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as notification from './store/notifications/notification.reducer';
import * as link from './store/links/links.reducer';

// Redux devtools icin (1):
import { environment } from '../environments/environment.prod';
import { SortSelectComponent } from './list/sort-select/sort-select.component';
import { LinkComponent } from './list/link/link.component';

// STATES:

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    AddLinkComponent,
    NotificationsComponent,
    SortSelectComponent,
    LinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({
      notification: notification.notificationReducer,
      link: link.linkReducer
    }),
    // Redux devtools icin (2):
    StoreDevtoolsModule.instrument({
      name: 'NgRx State',
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
