import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const getUsers = createAction('[User] GetUsers');
export const getUsersSuccess = createAction('[User] GetUsers Success', props<{ users: User[] }>());
export const getUsersError = createAction('[User] GetUsers Error');
export const updateUser = createAction('[User] UpdateUser', props<{ user: User }>());
export const updateUserSuccess = createAction('[User] UpdateUser Success', props<{ user: User }>());
export const updateUserError = createAction('[User] UpdateUser Error');
export const deleteUser = createAction('[User] DeleteUser', props<{ user: User }>());
export const deleteUserSuccess = createAction('[User] DeleteUser Success', props<{ id: string }>());
export const deleteUserError = createAction('[User] DeleteUser Error');
export const addUser = createAction('[User] AddUser', props<{ user: User }>());
