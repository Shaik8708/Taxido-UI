import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveRidesPage } from './active-rides.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveRidesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveRidesPageRoutingModule {}
