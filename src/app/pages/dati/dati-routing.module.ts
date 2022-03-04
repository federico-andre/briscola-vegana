import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatiPage } from './dati.page';

const routes: Routes = [
  {
    path: '',
    component: DatiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatiPageRoutingModule {}
