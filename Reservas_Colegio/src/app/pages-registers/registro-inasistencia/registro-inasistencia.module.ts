import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroInasistenciaPageRoutingModule } from './registro-inasistencia-routing.module';

import { RegistroInasistenciaPage } from './registro-inasistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroInasistenciaPageRoutingModule
  ],
  declarations: [RegistroInasistenciaPage]
})
export class RegistroInasistenciaPageModule {}
