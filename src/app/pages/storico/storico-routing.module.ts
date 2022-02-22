import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoricoPage } from './storico.page';

const routes: Routes = [
  {
    path: '',
    component: StoricoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoricoPageRoutingModule {}
