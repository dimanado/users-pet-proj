import { createAction, props } from '@ngrx/store';
import { LoginModel } from '@app/core/models/login.model';
import { AuthUser } from '@app/core/models/user.model';

export const login = createAction('[Login] Login', props<{ login: LoginModel }>());
export const loginSuccess = createAction('[Login] Login Success', props<{ user: AuthUser }>());
export const loginError = createAction('[Login] Login Error');
export const init = createAction('[Login] Init', props<{ user: AuthUser }>());

export const logout = createAction('[Login] Logout');
export const logoutSuccess = createAction('[Login] Logout Success');
export const logoutError = createAction('[Login] Logout Error');
