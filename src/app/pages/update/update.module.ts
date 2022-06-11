import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePageRoutingModule } from './update-routing.module';

import { UpdatePage } from './update.page';
import { UpdateAppointmentComponent } from 'src/app/components/update-appointment/update-appointment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePageRoutingModule
  ],
  declarations: [UpdatePage, UpdateAppointmentComponent]
})
export class UpdatePageModule {}
