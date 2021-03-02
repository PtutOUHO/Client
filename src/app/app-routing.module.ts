import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profil',
    loadChildren: () => import('./pages/tabs/profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'quetes',
    loadChildren: () => import('./pages/tabs/quetes/quetes.module').then( m => m.QuetesPageModule)
  },
  {
    path: 'parametres',
    loadChildren: () => import('./pages/tabs/parametres/parametres.module').then( m => m.ParametresPageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./pages/tabs/friends/friends.module').then( m => m.FriendsPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
