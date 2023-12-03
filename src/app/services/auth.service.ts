import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { IResLogin } from '@models/auth.model';
import { IUser } from '@models/user.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.api_url;
  user$ = new BehaviorSubject<IUser | null>(null);

  constructor(public http: HttpClient, private tokenService: TokenService) {}

  getDataUser() {
    //? This method needs to be called to detect changes, it isn't in real time
    return this.user$.getValue();
  }

  login(email: string, password: string) {
    return this.http
      .post<IResLogin>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          this.tokenService.saveToken(res.access_token);
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/register`, {
      name,
      email,
      password,
    });
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register(name, email, password).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  isAvailable(email: string | null) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/auth/is-available`,
      { email }
    );
  }

  recovery(email: string) {
    return this.http.post(`${this.apiUrl}/auth/recovery`, { email });
  }

  changePassword(token: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/change-password`, {
      token,
      password,
    });
  }

  logout() {
    this.tokenService.removeToken();
  }

  getProfile() {
    const token = this.tokenService.getToken();
    return this.http.get<IUser>(`${this.apiUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).pipe(
      tap((user) => {
        this.user$.next(user);
      })
    )
  }
}
