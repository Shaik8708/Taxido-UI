import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteRideDetailsPage } from './complete-ride-details.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteRideDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteRideDetailsPageRoutingModule {}
