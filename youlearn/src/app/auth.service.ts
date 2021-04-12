import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


export interface AuthResponseData {
  token: string;
  email: string;
  expiresIn: number,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  email: string;
  private authStatus = false;
  private timer: any;
  private authStatusListener = new Subject<boolean>()

  constructor(private http: HttpClient, private router: Router) { }


  getauthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  getauthStatus() {
    return this.authStatus
  }

  getToken() {
    return this.token
  }
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:3000/users',
        {
          email: email,
          password: password,
        }
      )
      .pipe(
        tap(this.tapMethod)
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:3000/users/login',
        {
          email: email,
          password: password,
        }
      )
      .pipe(
        tap(this.tapMethod)
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData()
    if (!authInformation) return
    const now = new Date();
    const isInFuture = authInformation.expirationDate > now;
    if (isInFuture) {
      this.token = authInformation.token;
      this.authStatus = true;
      this.authStatusListener.next(true)
    } else this.clearAuthData()
  }

  private tapMethod = (resData: AuthResponseData) => {
    this.token = resData.token;
    if (this.token) {
      const expiresIn = resData.expiresIn;
      this.authStatus = true;
      this.email = resData.email;
      this.authStatusListener.next(true)
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresIn * 1000);
      this.saveAuthData(this.token, expirationDate)
    }
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString())
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration')
  }

  logout() {
    this.token = null;
    this.email = null;
    this.authStatus = false;
    clearTimeout(this.timer)
    this.clearAuthData();
    this.authStatusListener.next(false)
    this.router.navigate(['/login'])
  }

  private getAuthData() {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expiration')
    if (!token || !expirationDate) return
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
