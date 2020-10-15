import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadNotaStudentPageRoutingModule } from './read-nota-student-routing.module';

import { ReadNotaStudentPage } from './read-nota-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadNotaStudentPageRoutingModule
  ],
  declarations: [ReadNotaStudentPage]
})
export class ReadNotaStudentPageModule {}
