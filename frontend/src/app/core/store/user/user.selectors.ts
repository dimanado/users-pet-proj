import { createSelector } from '@ngrx/store';
import { UserStore } from './user.reducer';

const selectUserState = (state: { user: UserStore }) => state.user;

export const selectUsers = createSelector(
  selectUserState,
  (state) => {
    return state.userList;
  }
);

export const selectUsersTotal = createSelector(
  selectUserState,
  (state) => {
    return state.total;
  }
);

export const selectPage = createSelector(
  selectUserState,
  (state) => {
    return state.page;
  }
);
