import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { environment } from '../../../environment/environment';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';

const keyLocalStorageUser = 'userData';

export type AuthResponseData = {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
};

const handleAuthentication = (userId: string, email: string, token: string, expiresIn: number) => {
	const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

	const user = new User(userId, email, token, expirationDate);
	localStorage.setItem(keyLocalStorageUser, JSON.stringify(user));

	return AuthActions.authenticationSuccess({
		userId: userId,
		email: email,
		token: token,
		expirationDate: expirationDate,
		redirect: true
	});
};

const handleError = (errorRes: any) => {
	// let errorMessage = 'Sorry, something went wrong!';
	//
	// if (!errorRes?.error?.error) {
	//   return of(new AuthActions.authenticateFail(errorMessage));
	// }
	//
	// switch (errorRes.error.error.message) {
	//   case 'EMAIL_EXISTS':
	//     errorMessage = 'This email exists already!';
	//     break;
	//   case 'OPERATION_NOT_ALLOWED':
	//     errorMessage = "We are sorry, but this operation doesn't exists.";
	//     break;
	//   case 'TOO_MANY_ATTEMPTS_TRY_LATER':
	//     errorMessage = 'We are sorry, but too many requests!';
	//     break;
	//   case 'EMAIL_NOT_FOUND':
	//     errorMessage = "We are sorry, but we can't find your useraccount";
	//     break;
	//   case 'INVALID_PASSWORD':
	//     errorMessage = 'We are sorry, but your password is wrong';
	//     break;
	//   case 'USER_DISABLED':
	//     errorMessage =
	//       'We are sorry, but your account is disabled, please get in touch with an admin';
	//     break;
	//   default:
	//     break;
	// }
	//
	// return of(new AuthActions.authenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
	authRedirect$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.authenticationSuccess),
				tap(response => {
					if (response.redirect) {
						this.router.navigateByUrl('/recipes');
					}
				})
			),
		{ dispatch: false }
	);
	authLogout$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.logout),
				tap(() => {
					localStorage.removeItem(keyLocalStorageUser);
					this.router.navigateByUrl('/auth');
				})
			),
		{ dispatch: false }
	);
	authAutoLogin$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.autoLogin),
			map(() => {
				const userData: {
					id: string;
					email: string;
					_token: string;
					_tokenExpirationDate: string;
				} = JSON.parse(localStorage.getItem(keyLocalStorageUser));

				if (!userData) {
					return { type: 'dummy' };
				}

				const loadedUser = new User(
					userData.id,
					userData.email,
					userData._token,
					new Date(userData._tokenExpirationDate)
				);

				if (loadedUser.token) {
					return AuthActions.authenticationSuccess({
						userId: userData.id,
						email: userData.email,
						token: userData._token,
						expirationDate: new Date(userData._tokenExpirationDate),
						redirect: false
					});
				}
				return { type: 'dummy' };
			})
		)
	);
	private databaseUrl = environment.firebasebaseBaseUrl;
	private apiKey = environment.firebaseApiKey;
	authSignup$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.signupStart),
			switchMap(authData => {
				const { email, password } = authData;

				return this.http.post<AuthResponseData>(
					`${this.databaseUrl}accounts:signUp?${this.apiKey}`,
					{
						email,
						password,
						returnSecureToken: true
					}
				);
			}),
			map(response => {
				const { localId: userId, email, idToken: token, expiresIn } = response;
				return handleAuthentication(userId, email, token, parseInt(expiresIn));
			})
		)
	);
	authLogin$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.loginStart),
			switchMap(authData => {
				const { email, password } = authData;

				return this.http.post<AuthResponseData>(
					`${this.databaseUrl}accounts:signInWithPassword?${this.apiKey}`,
					{
						email,
						password,
						returnSecureToken: true
					}
				);
			}),
			map(response => {
				const { localId: userId, email, idToken: token, expiresIn } = response;
				return handleAuthentication(userId, email, token, parseInt(expiresIn));
			})
			// catchError(error => {
			// 	return handleError(error);
			// })
		)
	);

	constructor(private http: HttpClient, private router: Router, private actions$: Actions) {}
}
