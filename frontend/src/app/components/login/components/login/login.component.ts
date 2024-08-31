import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { LoginStore } from '@app/core/store/login/login.reducer';
import * as LoginActions from '@app/core/store/login/login.actions';
import { selectIsLoginValid } from '@app/core/store/login/login.selectors';
import { removeError } from '@app/core/utils/from';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, ReactiveFormsModule, MatFormField, MatInput, MatError, MatButton, AsyncPipe]
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
