import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterLink } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { ActiveRidesComponent } from './pages/components/active-rides/active-rides.component';
import { SettingsComponent } from './pages/components/settings/settings.component';
import { NotificationsComponent } from './pages/components/notifications/notifications.component';
import { MyRidesComponent } from './pages/components/my-rides/my-rides.component';
import { HomeComponent } from './pages/components/home/home.component';
import { ContactComponent } from './pages/components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ActiveRidesComponent,
    SettingsComponent,
    NotificationsComponent,
    MyRidesComponent,
    HomeComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
