import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'partita',
        loadChildren: () => import('../partita/partita.module').then(m => m.PartitaPageModule)
      },
      {
        path: 'giocatori',
        loadChildren: () => import('../giocatori/giocatori.module').then(m => m.GiocatoriPageModule)
      },
      {
        path: 'storico',
        loadChildren: () => import('../storico/storico.module').then(m => m.StoricoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/partita',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/partita',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
