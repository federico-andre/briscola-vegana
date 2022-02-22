import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartitaEditPage } from './partita-edit/partita-edit.page';
import { PartitaPage } from './partita.page';

const routes: Routes = [
  {
    path: '',
    component: PartitaPage,
  },
  {
    path: 'partita/:id',
    component: PartitaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartitaPageRoutingModule {}
