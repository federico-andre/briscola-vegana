import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoricoPage } from './storico.page';
// import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StoricoPageRoutingModule } from './storico-routing.module';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: StoricoPage }]),
    StoricoPageRoutingModule,
  ],
  declarations: [StoricoPage, OrderByPipe]
})
export class StoricoPageModule {}
