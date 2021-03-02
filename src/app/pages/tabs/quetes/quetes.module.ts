import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuetesPageRoutingModule } from './quetes-routing.module';

import { QuetesPage } from './quetes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuetesPageRoutingModule
  ],
  declarations: [QuetesPage]
})
export class QuetesPageModule {}
