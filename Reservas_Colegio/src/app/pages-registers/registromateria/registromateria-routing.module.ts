import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistromateriaPage } from './registromateria.page';
import { LogeadoGuard } from 'src/app/guards/logeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[LogeadoGuard],
    component: RegistromateriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistromateriaPageRoutingModule {}
