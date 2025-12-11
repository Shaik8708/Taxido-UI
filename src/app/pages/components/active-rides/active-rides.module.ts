import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveRidesPageRoutingModule } from './active-rides-routing.module';

import { ActiveRidesPage } from './active-rides.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveRidesPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [ActiveRidesPage],
})
export class ActiveRidesPageModule {}
