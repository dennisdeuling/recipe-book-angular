import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../store/app.reducer';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router,
		private store: Store<appState>
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
		console.log(this.store);
		return true;
		// return this.authService.user.pipe(
		// 	take(1),
		// 	map(user => {
		// 		const isAuth = !!user;
		//
		// 		if (isAuth) {
		// 			return true;
		// 		}
		//
		// 		return this.router.createUrlTree(['/auth']);
		// 	})
		// 	// tap(isAuth => {
		// 	// 	if (!isAuth) {
		// 	// 		this.router.navigate(['/auth']);
		// 	// 	}
		// 	// })
		// );
	}
}
