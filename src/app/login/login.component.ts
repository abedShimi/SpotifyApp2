import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthError, AuthObject } from '../models/models';
import { AuthService } from '../services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  clientId = '4aaf9a4206734cca8764e07752be416a';
  redirectURI: string = 'http%3A%2F%2Flocalhost%3A4200%2Flogin';
  scope: string = 'user-read-private%20user-read-email';
  responseType: string = 'token';
  state: string = '123';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string) => {
      if (!this.isNullOrUndefined(fragment) && fragment != '') {
        let loginResult = this.getObjectFromFragment(fragment);
        if (
          !this.isNullOrUndefined(loginResult) &&
          'accessToken' in loginResult
        ) {
          this.authService.setAuthObject(loginResult);
          this.toastrService.success('Logged in Successfully');
          this.router.navigate(['/search-artists']);
        }
        if (!this.isNullOrUndefined(loginResult) && 'error' in loginResult) {
          this.toastrService.error('Log in Failure' + loginResult.error);
          this.authService.setAuthError(loginResult as AuthError);
        }

        if (this.isNullOrUndefined(loginResult))
          this.toastrService.error(
            'Something Went wrong please contact support'
          );
      }
    });
  }

  login() {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectURI}&scope=${this.scope}&response_type=${this.responseType}&state=${this.state}`;
  }

  isNullOrUndefined(object: any) {
    return object === null || object === undefined;
  }

  getObjectFromFragment(fragment: string): AuthObject | AuthError | null {
    let accessTokenKey = 'access_token=';
    let tokenTypeKey = '&token_type=';
    let expiresInKey = '&expires_in=';
    let stateKey = '&state=';

    let errorKey = 'error=';

    let indices: number[] = [
      fragment.indexOf(accessTokenKey),
      fragment.indexOf(tokenTypeKey),
      fragment.indexOf(expiresInKey),
      fragment.indexOf(stateKey),
    ];

    let indices2: number[] = [
      fragment.indexOf(errorKey),
      fragment.indexOf(stateKey),
    ];

    if (indices.indexOf(-1) == -1) {
      return {
        accessToken: fragment.substring(
          indices[0] + accessTokenKey.length,
          indices[1]
        ),
        tokenType: fragment.substring(
          indices[1] + tokenTypeKey.length,
          indices[2]
        ),
        expiresIn: +fragment.substring(
          indices[2] + expiresInKey.length,
          indices[3]
        ),
        state: fragment.substring(indices[3] + stateKey.length),
      };
    }

    if (indices2.indexOf(-1) == -1) {
      return {
        error: fragment.substring(indices2[0] + errorKey.length, indices2[1]),
        state: fragment.substring(indices2[1] + stateKey.length),
      };
    }

    return null;
  }
}
