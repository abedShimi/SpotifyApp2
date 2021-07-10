import { Injectable } from '@angular/core';
import { AuthError, AuthObject } from 'src/app/models/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authObject: AuthObject = null;
  private authError: AuthError = null;

  constructor() {}

  setAuthObject(authObject: AuthObject) {
    localStorage.setItem('token', authObject.accessToken);
    this.authObject = authObject;
  }
  setAuthError(authError: AuthError) {
    this.authError = authError;
  }
  getBeareToken() {
    if (this.authObject?.accessToken) return this.authObject?.accessToken;

    return localStorage.getItem('token');
  }

  clearBearer() {
    localStorage.setItem('token', null);
    this.authObject = null;
  }
}
