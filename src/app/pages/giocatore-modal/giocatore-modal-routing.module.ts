import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiocatoreModalPage } from './giocatore-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GiocatoreModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiocatoreModalPageRoutingModule {}
