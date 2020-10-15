import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroNotasPageRoutingModule } from './registro-notas-routing.module';

import { RegistroNotasPage } from './registro-notas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroNotasPageRoutingModule
  ],
  declarations: [RegistroNotasPage]
})
export class RegistroNotasPageModule {}
