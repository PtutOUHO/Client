import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrajetGeoPage } from './trajet-geo.page';

const routes: Routes = [
  {
    path: '',
    component: TrajetGeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrajetGeoPageRoutingModule {}
