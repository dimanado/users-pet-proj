import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, Observable } from 'rxjs';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

import * as UserActions from '@app/core/store/user/user.actions';
import { UserStore } from '@app/core/store/user/user.reducer';
import { User } from '@app/core/models/user.model';
import { selectUsers, selectUsersTotal } from '@app/core/store/user/user.selectors';
import { UserFormComponent } from '@app/components/user/components/user-form/user-form.component';
import { PageEvent } from '@angular/material/paginator';
import { PAGINATION } from '@app/core/constants/pagination';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
      MatPaginatorModule,
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
  usersTotal$: Observable<number> = this.store.select(selectUsersTotal);

  PAGINATION = PAGINATION;

  constructor(
    private store: Store<{ user: UserStore }>,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(UserActions.getUsers({ page: 1 }));
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

  handlePage(event: PageEvent) {
    this.store.dispatch(UserActions.getUsers({ page: event.pageIndex + 1 }));
  }
}
