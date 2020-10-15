import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroProfesorPage } from './registro-profesor.page';
import { LogeadoGuard } from 'src/app/guards/logeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[LogeadoGuard],
    component: RegistroProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroProfesorPageRoutingModule {}
