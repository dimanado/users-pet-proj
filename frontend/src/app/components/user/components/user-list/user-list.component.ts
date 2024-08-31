import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, Observable } from 'rxjs';

import * as UserActions from '@app/core/store/user/user.actions';
import { UserStore } from '@app/core/store/user/user.reducer';
import { User } from '@app/core/models/user.model';
import { selectUsers } from '@app/core/store/user/user.selectors';
import { UserFormComponent } from '@app/components/user/components/user-form/user-form.component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatIconButton,
        MatIcon,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatButton,
        AsyncPipe,
    ],
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
