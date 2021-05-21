import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuetesEnCoursPage } from './quetes-en-cours.page';

const routes: Routes = [
  {
    path: '',
    component: QuetesEnCoursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuetesEnCoursPageRoutingModule {}
