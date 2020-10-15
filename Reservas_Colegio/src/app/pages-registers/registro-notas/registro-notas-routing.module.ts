import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroNotasPage } from './registro-notas.page';
import { LogeadoGuard } from 'src/app/guards/logeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[LogeadoGuard],
    component: RegistroNotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroNotasPageRoutingModule {}
