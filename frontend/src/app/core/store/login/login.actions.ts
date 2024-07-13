import { createAction, props } from '@ngrx/store';
import { LoginModel } from '@app/core/models/login.model';

export const login = createAction('[Login] Login', props<{ login: LoginModel }>());
export const loginSuccess = createAction('[Login] Login Success');
export const loginError = createAction('[Login] Login Error');
