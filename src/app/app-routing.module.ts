import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './pages/auth/otp/otp.component';
import { HomeComponent } from './pages/components/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { ActiveRidesComponent } from './pages/components/active-rides/active-rides.component';
import { MyRidesComponent } from './pages/components/my-rides/my-rides.component';
import { NotificationsComponent } from './pages/components/notifications/notifications.component';
import { SettingsComponent } from './pages/components/settings/settings.component';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomePageModule),
  // },
  { path: 'otp', component: OtpComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'active-rides', component: ActiveRidesComponent },
  { path: 'my-rides', component: MyRidesComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'settings', component: SettingsComponent },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
