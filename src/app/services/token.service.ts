import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string): void {
    setCookie('token-trello', token, { expires: 1, path: '/' });
  }

  getToken(): string {
    return getCookie('token-trello') || '';
  }

  removeToken(): void {
    removeCookie('token-trello');
  }
}
