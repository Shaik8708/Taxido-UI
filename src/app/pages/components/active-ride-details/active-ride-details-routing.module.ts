import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveRideDetailsPage } from './active-ride-details.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveRideDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveRideDetailsPageRoutingModule {}
