import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from '@env/environment';
import { ListWithPaginationModel } from '@app/core/models/listWithPagination.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(page = 1): Observable<ListWithPaginationModel<User>> {
    return this.httpClient.request<ListWithPaginationModel<User>>(
      'GET',
      `${environment.backendApi}/users`,
      { params: { page: page.toString() } }
    ).pipe(
      map(({ list, total }) => {
        return { total, list: list.map((item) => new User(item)) };
      })
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
