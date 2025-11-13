import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Base {
  baseURL = environment.baseUrl;
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.baseURL + url, { params });
  }

  postLogin<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(
      'https://a8odwe94j2.execute-api.us-east-1.amazonaws.com/dev/' + url,
      body,
      { headers }
    );
  }
  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(this.baseURL + url, body, { headers });
  }

  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(this.baseURL + url, body, { headers });
  }

  patch<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(this.baseURL + url, body, { headers });
  }

  delete<T>(url: string, payload: any): Observable<T> {
    return this.http.delete<T>(this.baseURL + url, { body: payload });
  }
}
