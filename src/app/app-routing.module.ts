import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
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
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
