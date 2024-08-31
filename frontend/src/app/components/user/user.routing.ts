import { Routes } from '@angular/router';
import { UserListComponent } from '@app/components/user/components/user-list/user-list.component';

export const userRouting: Routes = [
  {
    path: '',
    component: UserListComponent,
  }
];
