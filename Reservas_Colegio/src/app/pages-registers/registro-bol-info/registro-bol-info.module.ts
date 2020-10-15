import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroBolInfoPageRoutingModule } from './registro-bol-info-routing.module';

import { RegistroBolInfoPage } from './registro-bol-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroBolInfoPageRoutingModule
  ],
  declarations: [RegistroBolInfoPage]
})
export class RegistroBolInfoPageModule {}
