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
        path: 'trajet-geo',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/trajet-geo/trajet-geo.module').then(m => m.TrajetGeoPageModule)
          }
        ]
      },
      {
        path: 'course',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/course/course.module').then(m => m.CoursePageModule)
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
        path: 'credit',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/tabs/credit/credit.module').then(m => m.CreditPageModule)
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
