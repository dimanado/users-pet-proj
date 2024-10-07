import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

import * as LoginActions from '@app/core/store/login/login.actions';
import * as baseActions from '@app/core/store/base/base.actions';
import { LoginService } from '@app/core/services/login.service';
import { AuthUser } from '@app/core/models/user.model';

@Injectable()
export class LoginEffects {
  base$ = createEffect(() =>
    this.actions$.pipe(
      ofType(baseActions.init),
      map(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
          const user = JSON.parse(localStorage.getItem('user')!);
          return { type: LoginActions.loginSuccess.type, user };
        }
        return { type: baseActions.initError.type };
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      mergeMap(({ login }) => this.loginService.login(login)
        .pipe(
          map((user: AuthUser) => {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/users']);
            return { type: LoginActions.loginSuccess.type, user: new AuthUser(user) };
          }),
          catchError(() => of({ type: LoginActions.loginError.type }))
        ))
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.logout),
      mergeMap(() => this.loginService.logout()
        .pipe(
          map(() => {
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
            return { type: LoginActions.logoutSuccess.type };
          }),
          catchError(() => of({ type: LoginActions.logoutError.type }))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
  ) {}
}
