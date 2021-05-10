import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsPageRoutingModule } from './amis-routing.module';

import { AmisPage } from './amis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsPageRoutingModule
  ],
  declarations: [AmisPage]
})
export class FriendsPageModule {}
