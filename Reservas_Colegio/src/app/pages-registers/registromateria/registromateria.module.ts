import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistromateriaPageRoutingModule } from './registromateria-routing.module';

import { RegistromateriaPage } from './registromateria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistromateriaPageRoutingModule
  ],
  declarations: [RegistromateriaPage]
})
export class RegistromateriaPageModule {}
