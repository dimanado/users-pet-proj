import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../../models/user.model';
import { updateUser } from './user.actions';

export interface UserStore {
  userList: User[],
}
export const initialState: UserStore = {
  userList: [],
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.getUsersSuccess, (state, { users }) => {
    return {
      ...state,
      userList: users,
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
  on(UserActions.addUser, (state, { user }) => {
    return {
      ...state,
      userList: [user, ...state.userList],
    };
  }),
);
