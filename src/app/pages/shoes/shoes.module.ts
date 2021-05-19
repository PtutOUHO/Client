import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoesPageRoutingModule } from './shoes-routing.module';

import { ShoesPage } from './shoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoesPageRoutingModule
  ],
  declarations: [ShoesPage]
})
export class ShoesPageModule {}
