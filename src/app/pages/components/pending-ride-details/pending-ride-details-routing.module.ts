import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingRideDetailsPage } from './pending-ride-details.page';

const routes: Routes = [
  {
    path: '',
    component: PendingRideDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingRideDetailsPageRoutingModule {}
