import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IUser } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.api_url;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<IUser[]>(`${this.apiUrl}/users`, {
      context: checkToken(),
      /*X headers: {
        X Authorization: `Bearer ${this.tokenService.getToken()}`
      } X */
    });
  }
}
