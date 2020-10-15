import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterNotifiPage } from './register-notifi.page';
import { LogeadoGuard } from 'src/app/guards/logeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[LogeadoGuard],
    component: RegisterNotifiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterNotifiPageRoutingModule {}
