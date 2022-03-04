import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatiPageRoutingModule } from './dati-routing.module';

import { DatiPage } from './dati.page';
import { StoricoPageModule } from '../storico/storico.module';
import { StatisticheComponent } from '../statistiche/statistiche.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatiPageRoutingModule,
    StoricoPageModule
  ],
  declarations: [DatiPage, StatisticheComponent]
})
export class DatiPageModule {}
