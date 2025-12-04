import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelRideDetailsPageRoutingModule } from './cancel-ride-details-routing.module';

import { CancelRideDetailsPage } from './cancel-ride-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelRideDetailsPageRoutingModule,
    SharedModule,
  ],
  declarations: [CancelRideDetailsPage],
})
export class CancelRideDetailsPageModule {}
