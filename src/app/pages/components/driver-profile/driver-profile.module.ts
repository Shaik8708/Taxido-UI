import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverProfilePageRoutingModule } from './driver-profile-routing.module';

import { DriverProfilePage } from './driver-profile.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverProfilePageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [DriverProfilePage],
})
export class DriverProfilePageModule {}
