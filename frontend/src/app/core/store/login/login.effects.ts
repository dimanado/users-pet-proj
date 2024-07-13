import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

import * as LoginActions from '@app/core/store/login/login.actions';
import { LoginService } from '@app/core/services/login.service';

@Injectable()
export class LoginEffects {
  users$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      mergeMap(({ login }) => this.loginService.login(login)
        .pipe(
          map(() => {
            this.router.navigate(['/users']);
            return { type: LoginActions.loginSuccess.type };
          }),
          catchError(() => of({ type: LoginActions.loginError.type }))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
  ) {}
}
