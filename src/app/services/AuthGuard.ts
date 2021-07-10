import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authService/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authServie: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.authServie.getBeareToken() != null &&
      this.authServie.getBeareToken() != undefined &&
      this.authServie.getBeareToken() != ''
    )
      return true;

    this.router.navigate(['/login']);
    return false;
  }
}
