import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEstuPadrePageRoutingModule } from './registro-estu-padre-routing.module';

import { RegistroEstuPadrePage } from './registro-estu-padre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroEstuPadrePageRoutingModule
  ],
  declarations: [RegistroEstuPadrePage]
})
export class RegistroEstuPadrePageModule {}
