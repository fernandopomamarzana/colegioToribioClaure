import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { NologeadoGuard } from '../guards/nologeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[NologeadoGuard],
    component: MenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
