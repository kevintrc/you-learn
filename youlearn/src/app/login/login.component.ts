import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup
  isLogin = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmitAuth() {
    this.error = null;
    this.isLoading = true;

    const email = this.authForm.get("email").value;
    const password = this.authForm.get("password").value;

    let authObs: Observable<AuthResponseData>

    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/public']);
      },
      errorMessage => {
        console.log(errorMessage);
        if (typeof errorMessage.error.error !== 'undefined')
          this.error = errorMessage.error.error;
        else this.error = "An unkown error Occured"
        this.isLoading = false;
      }
    );
    this.authForm.reset();
  }
}
