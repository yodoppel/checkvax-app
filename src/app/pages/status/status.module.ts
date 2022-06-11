import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatusPageRoutingModule } from './status-routing.module';

import { StatusPage } from './status.page';
import { StatusCardComponent } from 'src/app/components/status-card/status-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatusPageRoutingModule
  ],
  declarations: [
    StatusPage,
    StatusCardComponent]
})
export class StatusPageModule {}
