import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadEstuPage } from './read-estu.page';
import { LogeadoGuard } from 'src/app/guards/logeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[LogeadoGuard],
    component: ReadEstuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadEstuPageRoutingModule {}
