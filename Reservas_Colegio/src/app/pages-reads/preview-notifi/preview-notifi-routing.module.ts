import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewNotifiPage } from './preview-notifi.page';
import { LogeadoGuard } from 'src/app/guards/logeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[LogeadoGuard],
    component: PreviewNotifiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewNotifiPageRoutingModule {}
