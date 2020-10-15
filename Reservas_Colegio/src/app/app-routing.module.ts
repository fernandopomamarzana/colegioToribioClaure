import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LogeadoGuard} from '../app/guards/logeado.guard';
import { NologeadoGuard } from '../app/guards/nologeado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages-registers/registro/registro.module').then( m => m.RegistroPageModule),
  },
  {
    path: 'registro-curso',
    loadChildren: () => import('./pages-registers/registro-curso/registro-curso.module').then( m => m.RegistroCursoPageModule),
  },
  {
    path: 'registromateria',
    loadChildren: () => import('./pages-registers/registromateria/registromateria.module').then( m => m.RegistromateriaPageModule),
  },
  {
    path: 'materiascurso',
    loadChildren: () => import('./pages-reads/materiascurso/materiascurso.module').then( m => m.MateriascursoPageModule),
  },
  {
    path: 'registro-profesor',
    loadChildren: () => import('./pages-registers/registro-profesor/registro-profesor.module').then( m => m.RegistroProfesorPageModule),
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),
  },
  {
    path: 'registro-estu-padre',
    loadChildren: () => import('./pages-registers/registro-estu-padre/registro-estu-padre.module').then( m => m.RegistroEstuPadrePageModule),
  },
  {
    path: 'read-estu',
    loadChildren: () => import('./pages-reads/read-estu/read-estu.module').then( m => m.ReadEstuPageModule),
  },
  {
    path: 'registro-notas',
    loadChildren: () => import('./pages-registers/registro-notas/registro-notas.module').then( m => m.RegistroNotasPageModule),
  },
  {
    path: 'registro-inasistencia',
    loadChildren: () => import('./pages-registers/registro-inasistencia/registro-inasistencia.module').then( m => m.RegistroInasistenciaPageModule),
  },
  {
    path: 'read-nota-profesor',
    loadChildren: () => import('./pages-reads/read-nota-profesor/read-nota-profesor.module').then( m => m.ReadNotaProfesorPageModule),
  },
  {
    path: 'read-nota-student',
    loadChildren: () => import('./pages-reads/read-nota-student/read-nota-student.module').then( m => m.ReadNotaStudentPageModule),
  },
  {
    path: 'register-notifi',
    loadChildren: () => import('./pages-registers/register-notifi/register-notifi.module').then( m => m.RegisterNotifiPageModule)
  },
  {
    path: 'registro-bol-info',
    loadChildren: () => import('./pages-registers/registro-bol-info/registro-bol-info.module').then( m => m.RegistroBolInfoPageModule)
  },
  {
    path: 'preview-image',
    loadChildren: () => import('./pages-reads/preview-image/preview-image.module').then( m => m.PreviewImagePageModule)
  },
  {
    path: 'preview-notifi',
    loadChildren: () => import('./pages-reads/preview-notifi/preview-notifi.module').then( m => m.PreviewNotifiPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
