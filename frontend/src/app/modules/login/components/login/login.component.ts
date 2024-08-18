import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { LoginStore } from '@app/core/store/login/login.reducer';
import * as LoginActions from '@app/core/store/login/login.actions';
import { selectIsLoginValid } from '@app/core/store/login/login.selectors';
import { removeError } from '@app/core/utils/from';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  isLoginValid$: Observable<boolean> = this.store.select(selectIsLoginValid)
    .pipe(
      tap((isLoginValid) => {
        console.log('isLoginValid', isLoginValid);
        if (!isLoginValid) {
          this.loginForm.get('email')?.setErrors({ invalidLogin: true });
        }
      })
    );

  changeFormValue$: Observable<unknown> = this.loginForm.valueChanges
    .pipe(
      tap((value) => {
        removeError(this.loginForm.get('email') as FormControl, 'invalidLogin');
      }
    )
  );

  constructor(
    private store: Store<{ login: LoginStore }>,
  ) { }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(LoginActions.login({ login: this.loginForm.value }));
    }
  }
}
