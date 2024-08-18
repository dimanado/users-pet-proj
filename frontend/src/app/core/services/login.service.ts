import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

import { LoginModel } from '@app/core/models/login.model';
import { AuthUser } from '@app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  login(loginData: LoginModel): Observable<AuthUser> {
    return this.httpClient.request<AuthUser>(
      'POST',
      `${environment.backendApi}/login`,
      { body: loginData }
    );
  }

  logout(): Observable<unknown> {
    return this.httpClient.request<void>(
      'POST',
      `${environment.backendApi}/logout`
    );
  }
}
