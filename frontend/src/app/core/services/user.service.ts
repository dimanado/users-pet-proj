import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.request<User[]>(
      'GET',
      'http://localhost:3000/users'
    ).pipe(
      map((user) => user.map((item) => new User(item)))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.request<User>(
      'PUT',
      'http://localhost:3000/users/' + user.id,
      { body: user }
    ).pipe(
      map((user) => new User(user))
    );
  }

  deleteUser(user: User): Observable<string> {
    return this.httpClient.request<string>(
      'DELETE',
      'http://localhost:3000/users/' + user.id
    );
  }
}
