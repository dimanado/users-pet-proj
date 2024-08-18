import { createReducer, on } from '@ngrx/store';

import * as LoginActions from './login.actions';
import { AuthUser } from '@app/core/models/user.model';

export interface LoginStore {
  isLoginValid: boolean,
  user: AuthUser | null,
}
export const initialState: LoginStore = {
  isLoginValid: true,
  user: null,
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.login, (state) => {
    return {
      ...state,
      user: null,
      isLoginValid: true,
    };
  }),
  on(LoginActions.loginSuccess, (state, { user }) => {
    return {
      ...state,
      user,
      isLoginValid: true,
    };
  }),
  on(LoginActions.loginError, (state) => {
    return {
      ...state,
      user: null,
      isLoginValid: false,
    };
  }),
  on(LoginActions.logoutSuccess, (state) => {
    return {
      ...state,
      user: null,
      isLoginValid: true,
    };
  }),
  on(LoginActions.logoutError, (state) => {
    return {
      ...state,
      isLoginValid: true,
    };
  }),
);
