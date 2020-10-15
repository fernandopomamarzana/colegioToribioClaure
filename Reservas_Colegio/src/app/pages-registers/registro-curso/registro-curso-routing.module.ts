import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroCursoPage } from './registro-curso.page';
import { LogeadoGuard } from 'src/app/guards/logeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[LogeadoGuard],
    component: RegistroCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroCursoPageRoutingModule {}
