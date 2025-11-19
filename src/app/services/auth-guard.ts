import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Base } from './base-api/base';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private cookiesService: CookieService) {}

  canActivate(
    route: any,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isAuthenticated = !!this.cookiesService.get('driver_actkn');
    const publicRoutes = ['/login', '/signup', '/otp', '/login-otp'];

    if (isAuthenticated) {
      if (publicRoutes.includes(state.url)) {
        return this.router.parseUrl('/dashboard');
      }
      return true;
    } else {
      if (!publicRoutes.includes(state.url)) {
        return this.router.parseUrl('/login');
      }
      return true;
    }
  }
}
