import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.request<User[]>(
      'GET',
      `${environment.backendApi}/users`
    ).pipe(
      map((user) => user.map((item) => new User(item)))
    );
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.request<User>(
      'POST',
      `${environment.backendApi}/users`,
      { body: user }
    ).pipe(
      map((user) => new User(user))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.request<User>(
      'PUT',
      `${environment.backendApi}/users/` + user.id,
      { body: user }
    ).pipe(
      map((user) => new User(user))
    );
  }

  deleteUser(user: User): Observable<string> {
    return this.httpClient.request<string>(
      'DELETE',
      `${environment.backendApi}/users/` + user.id
    );
  }
}
