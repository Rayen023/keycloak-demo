import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializer } from 'src/utils/app-inits';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ManagerComponent } from './manager/manager.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [
    AppComponent,
    AccessDeniedComponent,
    ManagerComponent,
    AdminComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule, // add keycloakAngular module
    HttpClientModule,
  ],
  providers: [
  // add this provider
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [KeycloakService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}