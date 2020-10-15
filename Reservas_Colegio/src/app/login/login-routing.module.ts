import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { NologeadoGuard } from '../guards/nologeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[NologeadoGuard],
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
