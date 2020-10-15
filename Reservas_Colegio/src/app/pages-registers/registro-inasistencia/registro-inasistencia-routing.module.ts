import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroInasistenciaPage } from './registro-inasistencia.page';
import { LogeadoGuard } from 'src/app/guards/logeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[LogeadoGuard],
    component: RegistroInasistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroInasistenciaPageRoutingModule {}
