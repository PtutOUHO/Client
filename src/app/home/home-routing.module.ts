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
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/map/map.module').then(m => m.MapPageModule)
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
