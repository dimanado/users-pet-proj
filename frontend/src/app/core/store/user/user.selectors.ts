import { createSelector } from '@ngrx/store';
import { UserStore } from './user.reducer';

const selectUserState = (state: { user: UserStore }) => state.user;

export const selectUsers = createSelector(
  selectUserState,
  (state) => {
    return state.userList;
  }
);
