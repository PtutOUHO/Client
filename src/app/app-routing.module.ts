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
    path: 'home/accueil',
    loadChildren: () => import('./pages/tabs/accueil/accueil.module').then( m => m.AccueilPageModule)
  },
  {
    path: 'home/map',
    loadChildren: () => import('./pages/map/map.module').then(m => m.MapPageModule)
  },
  {
    path: 'home/trajet-geo',
    loadChildren: () => import('./pages/trajet-geo/trajet-geo.module').then( m => m.TrajetGeoPageModule)
  },
  {
    path: 'home/profil',
    loadChildren: () => import('./pages/tabs/profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'home/quetes',
    loadChildren: () => import('./pages/tabs/quetes/quetes.module').then( m => m.QuetesPageModule)
  },
  {
    path:'shoes/:quest_id',
    loadChildren: () => import('./pages/shoes/shoes.module').then( m => m.ShoesPageModule)
  },
  {
    path: 'home/credit',
    loadChildren: () => import('./pages/tabs/credit/credit.module').then( m => m.CreditPageModule)
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
  {
    path: 'profil-edit',
    loadChildren: () => import('./profil-edit/profil-edit.module').then( m => m.ProfilEditPageModule)
  },
  {
    path: 'course',
    loadChildren: () => import('./pages/course/course.module').then( m => m.CoursePageModule)
  },
  {
    path: '404',
    loadChildren: () => import('./error-page/error-page.module').then( m => m.ErrorPagePageModule)
  },
  // A PLACER A LA FIN
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
