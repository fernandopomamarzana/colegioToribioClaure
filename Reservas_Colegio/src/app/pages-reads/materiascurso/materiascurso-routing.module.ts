import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriascursoPage } from './materiascurso.page';
import { LogeadoGuard } from 'src/app/guards/logeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[LogeadoGuard],
    component: MateriascursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriascursoPageRoutingModule {}
