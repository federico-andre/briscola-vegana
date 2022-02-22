import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GiocatoreModalPageRoutingModule } from './giocatore-modal-routing.module';
import { GiocatoreModalPage } from './giocatore-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GiocatoreModalPageRoutingModule
  ],
  declarations: [GiocatoreModalPage]
})
export class GiocatoreModalPageModule {}
