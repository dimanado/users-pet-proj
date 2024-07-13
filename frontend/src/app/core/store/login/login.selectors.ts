import { createSelector } from '@ngrx/store';

import { LoginStore } from './login.reducer';

const selectLoginState = (state: { login: LoginStore }) => state.login;

export const selectIsLoginValid = createSelector(
  selectLoginState,
  (state) => {
    return state.isLoginValid;
  }
);
