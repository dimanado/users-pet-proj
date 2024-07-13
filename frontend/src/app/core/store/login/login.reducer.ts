import { createReducer, on } from '@ngrx/store';

import * as LoginActions from './login.actions';

export interface LoginStore {
  isLoginValid: boolean,
}
export const initialState: LoginStore = {
  isLoginValid: true,
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.login, (state) => {
    return {
      ...state,
      isLoginValid: true,
    };
  }),
  on(LoginActions.loginSuccess, (state) => {
    return {
      ...state,
      isLoginValid: true,
    };
  }),
  on(LoginActions.loginError, (state) => {
    return {
      ...state,
      isLoginValid: false,
    };
  }),
);
