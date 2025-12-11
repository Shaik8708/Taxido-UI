import { Injectable } from '@angular/core';
import { Jwt } from '../jwt';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Action } from '../action';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(
    public jwtService: Jwt,
    private action: Action,
    private router: Router,
    private cookieService: CookieService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('driver_actkn');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwtService.getToken()}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // this.action.presentActionSheet();
          this.cookieService.deleteAll();
          this.router.navigateByUrl('/login');
        }
        return throwError(error);
      })
    );
  }
}
