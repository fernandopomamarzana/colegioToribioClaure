import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadNotaProfesorPageRoutingModule } from './read-nota-profesor-routing.module';

import { ReadNotaProfesorPage } from './read-nota-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadNotaProfesorPageRoutingModule
  ],
  declarations: [ReadNotaProfesorPage]
})
export class ReadNotaProfesorPageModule {}
