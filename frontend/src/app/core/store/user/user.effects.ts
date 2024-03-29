import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import * as UserActions from './user.actions';
import { User } from '@app/core/models/user.model';
import { UserService } from '@app/core/services/user.service';

@Injectable()
export class UserEffects {
  users$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      mergeMap(() => this.userService.getUsers()
        .pipe(
          map((users: User[]) => ({ type: UserActions.getUsersSuccess.type, users: users })),
          catchError(() => of({ type: UserActions.getUsersError.type }))
        ))
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      mergeMap(({ user }) => this.userService.addUser(user)
        .pipe(
          map((user: User) => ({ type: UserActions.addUserSuccess.type, user: user })),
          catchError(() => of({ type: UserActions.addUserError.type }))
        ))
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ user }) => this.userService.updateUser(user)
        .pipe(
          map((user: User) => ({ type: UserActions.updateUserSuccess.type, user: user })),
          catchError(() => of({ type: UserActions.updateUserError.type }))
        ))
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({ user }) => this.userService.deleteUser(user)
        .pipe(
          map(() => ({ type: UserActions.deleteUserSuccess.type, id: user.id })),
          catchError(() => of({ type: UserActions.deleteUserError.type }))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
