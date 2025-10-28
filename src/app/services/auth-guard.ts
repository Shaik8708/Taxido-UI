import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Base } from './base-api/base';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private base: Base, private router: Router) {}

  canActivate(): boolean {
    if (this.base.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
