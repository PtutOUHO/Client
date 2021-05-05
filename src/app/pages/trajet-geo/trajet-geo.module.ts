import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrajetGeoPageRoutingModule } from './trajet-geo-routing.module';

import { TrajetGeoPage } from './trajet-geo.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrajetGeoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TrajetGeoPage],
  providers: [Geolocation]
})
export class TrajetGeoPageModule {}
