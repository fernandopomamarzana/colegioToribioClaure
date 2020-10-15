import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriascursoPageRoutingModule } from './materiascurso-routing.module';

import { MateriascursoPage } from './materiascurso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriascursoPageRoutingModule
  ],
  declarations: [MateriascursoPage]
})
export class MateriascursoPageModule {}
