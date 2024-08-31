import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoginStore } from '@app/core/store/login/login.reducer';
import * as LoginActions from '@app/core/store/login/login.actions';
import { AuthUser } from '@app/core/models/user.model';
import { selectAuthUser } from '@app/core/store/login/login.selectors';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterLink, RouterOutlet, AsyncPipe]
})
export class AppComponent {
  title = 'test-angular-proj';

  //TODO: create header component
  user$: Observable<AuthUser | null> = this.store.select(selectAuthUser);

  constructor(private store: Store<{ login: LoginStore }>) {
  }

  logout() {
    this.store.dispatch(LoginActions.logout());
  }
}
