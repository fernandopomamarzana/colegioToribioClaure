import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { LogeadoGuard } from '../guards/logeado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[LogeadoGuard],
    component: FolderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
