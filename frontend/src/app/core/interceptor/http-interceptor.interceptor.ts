import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import { LoginStore } from '@app/core/store/login/login.reducer';
import { selectAuthUser } from '@app/core/store/login/login.selectors';
import { IGNORED_URLS } from '@app/core/interceptor/constants';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const loginStore = inject(Store<{ login: LoginStore }>);

  req = req.clone({
    withCredentials: true
  });

  if (IGNORED_URLS.some(url => req.url.includes(url))) {
    return next(req);
  }

  return loginStore.select(selectAuthUser).pipe(
    take(1),
    switchMap(user => {
      if (!user) {
        router.navigate(['/login']);
        return throwError(() => new HttpErrorResponse({ status: 401 }));
      }

      return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    })
  );
};
