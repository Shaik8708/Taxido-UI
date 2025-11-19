import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Jwt {
  constructor(private cookieService: CookieService) {}
  getToken() {
    return this.cookieService.get('driver_actkn');
  }

  destroyToken() {
    return this.cookieService.get('driver_actkn');
  }
}
