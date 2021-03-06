import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuetesPage } from './quetes.page';

const routes: Routes = [
  {
    path: '',
    component: QuetesPage
  },
  {
    path: 'shoes/:quest_id',
    loadChildren: () => import('../../shoes/shoes.module').then( m => m.ShoesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuetesPageRoutingModule {}
