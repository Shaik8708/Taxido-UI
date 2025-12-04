import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteRideDetailsPageRoutingModule } from './complete-ride-details-routing.module';

import { CompleteRideDetailsPage } from './complete-ride-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteRideDetailsPageRoutingModule,
    SharedModule,
  ],
  declarations: [CompleteRideDetailsPage],
})
export class CompleteRideDetailsPageModule {}
