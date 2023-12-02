import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from '@environments/environment';
import { IUser } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.api_url;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getUsers() {
    return this.http.get<IUser[]>(`${this.apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    });
  }
}
