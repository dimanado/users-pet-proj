import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../../models/user.model';

export interface UserStore {
  userList: User[],
  total: number,
  page: number,
}
export const initialState: UserStore = {
  userList: [],
  total: 0,
  page: 0,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.getUsersSuccess, (state, { listWithPagination }) => {
    return {
      ...state,
      userList: listWithPagination.list,
      total: listWithPagination.total,
      page: state.page + 1,
    };
  }),
  on(UserActions.updateUserSuccess, (state, { user }) => {
    return {
      ...state,
      userList: state.userList.map((item: User) => {
        return item.id === user.id ? user : item
      }),
    };
  }),
  on(UserActions.deleteUserSuccess, (state, { id }) => {
    return {
      ...state,
      userList: state.userList.filter((user) => user.id !== id),
    };
  }),
  on(UserActions.addUserSuccess, (state, { user }) => {
    return {
      ...state,
      userList: [user, ...state.userList],
    };
  }),
);
