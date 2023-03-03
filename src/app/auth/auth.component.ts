import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './store/auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as AuthActions from './store/auth.actions';
import * as fromApp from '../store/app.reducer';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
	@ViewChild('authForm')
	authForm: NgForm;
	@ViewChild(PlaceholderDirective)
	alertHost: PlaceholderDirective;
	isLoginMode = true;
	isLoading = false;
	error: string | null = null;
	private closeSub: Subscription;

	constructor(
		private authService: AuthService,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private store: Store<fromApp.appState>
	) {}

	ngOnDestroy() {
		if (this.closeSub) {
			this.closeSub.unsubscribe();
		}
	}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit() {
		const { email, password } = this.authForm.value;
		if (!this.authForm.valid) {
			return;
		}

		if (this.isLoginMode) {
			this.store.dispatch(AuthActions.loginStart({ email, password }));
		} else {
			this.store.dispatch(AuthActions.signupStart({ email, password }));
		}
		this.authForm.reset();
	}

	onHandleError() {
		this.error = null;
	}

	private showErrorAlert(errorRes: string) {
		const alertComponentFactory =
			this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();

		const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

		componentRef.instance.message = errorRes;
		this.closeSub = componentRef.instance.close.subscribe(() => {
			this.closeSub.unsubscribe();
			hostViewContainerRef.clear();
		});
	}
}
