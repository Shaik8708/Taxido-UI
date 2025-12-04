import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingRideDetailsPageRoutingModule } from './pending-ride-details-routing.module';

import { PendingRideDetailsPage } from './pending-ride-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingRideDetailsPageRoutingModule,
    SharedModule,
  ],
  declarations: [PendingRideDetailsPage],
})
export class PendingRideDetailsPageModule {}
