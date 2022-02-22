import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GiocatoriPage } from './giocatori.page';
import { GiocatoriPageRoutingModule } from './giocatori-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GiocatoriPageRoutingModule
  ],
  declarations: [GiocatoriPage]
})
export class GiocatoriPageModule {}
