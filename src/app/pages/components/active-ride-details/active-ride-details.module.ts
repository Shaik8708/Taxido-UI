import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveRideDetailsPageRoutingModule } from './active-ride-details-routing.module';

import { ActiveRideDetailsPage } from './active-ride-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveRideDetailsPageRoutingModule,
    SharedModule,
  ],
  declarations: [ActiveRideDetailsPage],
})
export class ActiveRideDetailsPageModule {}
