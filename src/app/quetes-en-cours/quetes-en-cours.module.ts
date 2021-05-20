import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuetesEnCoursPageRoutingModule } from './quetes-en-cours-routing.module';

import { QuetesEnCoursPage } from './quetes-en-cours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuetesEnCoursPageRoutingModule
  ],
  declarations: [QuetesEnCoursPage]
})
export class QuetesEnCoursPageModule {}
