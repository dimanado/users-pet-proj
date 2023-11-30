import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, Observable } from 'rxjs';

import * as UserActions from '@app/core/store/user/user.actions';
import { UserStore } from '@app/core/store/user/user.reducer';
import { User } from '@app/core/models/user.model';
import { selectUsers } from '@app/core/store/user/user.selectors';
import { UserFormComponent } from '@app/modules/user/components/user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit{
  displayedColumns: string[] = ['name', 'lastName', 'age', 'height', 'weight', 'edit', 'delete'];
  users$: Observable<User[]> = this.store.select(selectUsers);

  constructor(
    private store: Store<{ user: UserStore }>,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(UserActions.getUsers());
  }

  async onEditUser(user: User): Promise<void> {
    const ref = this.dialog.open(UserFormComponent, {
      data: { user },
    });

    const updatedUser: User = await firstValueFrom(ref.afterClosed());

    if (updatedUser) {
      this.store.dispatch(UserActions.updateUser({ user: updatedUser }));
    }
  }

  onDeleteUser(user: User) {
    this.store.dispatch(UserActions.deleteUser({ user }));
  }

  async onAddUser(): Promise<void> {
    const ref = this.dialog.open(UserFormComponent, {
      data: {},
    });

    const newUser: User = await firstValueFrom(ref.afterClosed());

    if (newUser) {
      this.store.dispatch(UserActions.addUser({ user: newUser }));
    }
  }
}
