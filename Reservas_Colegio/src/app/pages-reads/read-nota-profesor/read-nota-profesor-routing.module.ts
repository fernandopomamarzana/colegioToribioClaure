import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadNotaProfesorPage } from './read-nota-profesor.page';
import { LogeadoGuard } from 'src/app/guards/logeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[LogeadoGuard],
    component: ReadNotaProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadNotaProfesorPageRoutingModule {}
