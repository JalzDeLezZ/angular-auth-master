import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '@guards/auth.guard';
import { redirectGuard } from '@guards/redirect.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [redirectGuard],
  },
  {
    path: 'app',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
