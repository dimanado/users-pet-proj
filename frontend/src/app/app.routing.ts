import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', loadChildren: () => import('@app/components/login/login.routing').then(m => m.loginRouting) },
  { path: 'users', loadChildren: () => import('@app/components/user/user.routing').then(m => m.userRouting) },
];
