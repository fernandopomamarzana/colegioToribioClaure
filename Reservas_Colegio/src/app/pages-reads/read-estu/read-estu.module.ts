import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadEstuPageRoutingModule } from './read-estu-routing.module';

import { ReadEstuPage } from './read-estu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadEstuPageRoutingModule
  ],
  declarations: [ReadEstuPage]
})
export class ReadEstuPageModule {}
