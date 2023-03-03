import { createAction, props } from '@ngrx/store';

export const loginStart = createAction(
	'[Authentication] Login start',
	props<{ email: string; password: string }>()
);

export const signupStart = createAction(
	'[Authentication] Signup Start',
	props<{ email: string; password: string }>()
);

export const autoLogin = createAction('[Authentication] Autologin');

export const logout = createAction('[Authentication] Logout');

export const authenticationSuccess = createAction(
	'[Authentication] Authentication success',
	props<{
		email: string;
		userId: string;
		token: string;
		expirationDate: Date;
		redirect: boolean;
	}>()
);

export const authenticationFail = createAction('[Authentication] Authentication fail');
