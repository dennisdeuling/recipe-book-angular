import { createReducer, on } from '@ngrx/store';
import { authenticationSuccess, autoLogin, loginStart, logout, signupStart } from './auth.actions';
import { User } from '../user.model';

export type stateType = {
	user: User;
	authError: string;
};

const initialState: stateType = {
	user: null,
	authError: null
};

export const authReducer = createReducer(
	initialState,
	on(signupStart, (state, action) => ({
		...state,
		authError: null
	})),
	on(loginStart, (state, action) => ({
		...state,
		authError: null
	})),
	on(autoLogin, (state, action) => ({
		...state,
		authError: null
	})),
	on(logout, (state, action) => ({
		...state,
		authError: null,
		user: null
	})),
	on(authenticationSuccess, (state, action) => {
		const { userId, email, token, expirationDate } = action;
		const user = new User(userId, email, token, expirationDate);

		return {
			...state,
			authError: null,
			user
		};
	})
);
