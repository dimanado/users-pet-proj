import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

import { LoginModel } from '@app/core/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  login(loginData: LoginModel): Observable<any> {
    return this.httpClient.request<void>(
      'POST',
      `${environment.backendApi}/login`,
      { body: loginData }
    );
  }
}
