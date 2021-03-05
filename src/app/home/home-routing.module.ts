import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'accueil',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/tabs/accueil/accueil.module').then(m => m.AccueilPageModule)
          }
        ]
      },
      {
        path: 'profil',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/tabs/profil/profil.module').then(m => m.ProfilPageModule)
          }
        ]
      },
      {
        path: 'quetes',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/tabs/quetes/quetes.module').then(m => m.QuetesPageModule)
          }
        ]
      },
      {
        path: 'options',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/tabs/parametres/parametres.module').then(m => m.ParametresPageModule)
          }
        ]
      },
      {
        path: 'friends',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/tabs/friends/friends.module').then(m => m.FriendsPageModule)
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
