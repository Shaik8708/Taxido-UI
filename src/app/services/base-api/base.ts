import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Base {
  constructor(private http: HttpClient) {}

  login(credentials: { number: number; password: string }): Observable<any> {
    return this.http.post(`${environment.baseUrl}dealer/login`, credentials);
  }

  signup(data: {
    type: string[];
    fullName: string;
    password: string;
    email: string;
    username: string;
    phoneNumber: number;
  }): Observable<any> {
    return this.http.post(`${environment.baseUrl}dealer/register`, data);
  }

  // logout() {
  //   localStorage.removeItem('token');
  // }

  // saveToken(token: string) {
  //   localStorage.setItem('token', token);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }
}
