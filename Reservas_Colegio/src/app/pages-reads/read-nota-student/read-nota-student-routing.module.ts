import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadNotaStudentPage } from './read-nota-student.page';
import { LogeadoGuard } from 'src/app/guards/logeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[LogeadoGuard],
    component: ReadNotaStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadNotaStudentPageRoutingModule {}
