import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'profil',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/profil/profil.module').then(m => m.ProfilPageModule)
          }
        ]
      },
      {
        path: 'quetes',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/quetes/quetes.module').then(m => m.QuetesPageModule)
          }
        ]
      },
      {
        path: 'parametres',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/parametres/parametres.module').then(m => m.ParametresPageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
