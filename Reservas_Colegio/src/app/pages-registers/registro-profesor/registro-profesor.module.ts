import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroProfesorPageRoutingModule } from './registro-profesor-routing.module';

import { RegistroProfesorPage } from './registro-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroProfesorPageRoutingModule
  ],
  declarations: [RegistroProfesorPage]
})
export class RegistroProfesorPageModule {}
