import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  @ViewChild('authForm')
  authForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const userData = this.authForm.value;
    if (!this.authForm.valid) {
      return;
    }

    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(userData);
    } else {
      authObs = this.authService.signUp(userData);
    }

    authObs.subscribe(response => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorRes => {
      this.error = errorRes;
      this.isLoading = false;
    });
    this.authForm.reset();
  }
}
