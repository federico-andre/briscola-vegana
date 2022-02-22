import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartitaPage } from './partita.page';
import { PartitaPageRoutingModule } from './partita-routing.module';
import { PartitaModalPage } from './modals/partita-modal.page';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { PartitaEditPage } from './partita-edit/partita-edit.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PartitaPageRoutingModule
  ],
  declarations: [PartitaPage, PartitaModalPage, OrderByPipe, PartitaEditPage]
})
export class PartitaPageModule {}
