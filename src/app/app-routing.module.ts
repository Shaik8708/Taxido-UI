import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard';
// import { OtpComponent } from './pages/auth/otp1/otp.component';

// import { HomeComponent } from './pages/components/home/home.component';
// import { LoginComponent } from './pages/auth/login1/login.component';
// import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
// import { ActiveRidesComponent } from './pages/components/active-rides/active-rides.component';
// import { MyRidesComponent } from './pages/components/my-rides/my-rides.component';
// import { NotificationsComponent } from './pages/components/notifications/notifications.component';
// import { SettingsComponent } from './pages/components/settings/settings.component';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomePageModule),
  // },
  // { path: 'otp', component: OtpComponent },
  // { path: 'dashboard', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignUpComponent },
  // { path: 'active-rides', component: ActiveRidesComponent },
  // { path: 'my-rides', component: MyRidesComponent },
  // { path: 'notifications', component: NotificationsComponent },
  // { path: 'settings', component: SettingsComponent },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'otp',
    loadChildren: () =>
      import('./pages/auth/otp/otp.module').then((m) => m.OtpPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/auth/sign-up/sign-up.module').then(
        (m) => m.SignUpPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'active-rides',
    loadChildren: () =>
      import('./pages/components/active-rides/active-rides.module').then(
        (m) => m.ActiveRidesPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./pages/components/contact/contact.module').then(
        (m) => m.ContactPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/components/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'my-rides',
    loadChildren: () =>
      import('./pages/components/my-rides/my-rides.module').then(
        (m) => m.MyRidesPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./pages/components/notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/components/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login-otp',
    loadChildren: () =>
      import('./pages/auth/login-otp/login-otp.module').then(
        (m) => m.LoginOtpPageModule
      ),
    canActivate: [AuthGuard],
  },  {
    path: 'driver-profile',
    loadChildren: () => import('./pages/components/driver-profile/driver-profile.module').then( m => m.DriverProfilePageModule)
  },
  {
    path: 'driver-wallet',
    loadChildren: () => import('./pages/components/driver-wallet/driver-wallet.module').then( m => m.DriverWalletPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
