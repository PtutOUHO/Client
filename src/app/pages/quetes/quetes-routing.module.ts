import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuetesPage } from './quetes.page';

const routes: Routes = [
  {
    path: '',
    component: QuetesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuetesPageRoutingModule {}
