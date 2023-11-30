import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string): void {
    setCookie('token-cook', token, { expires: 1, path: '/' });
  }

  getToken(): string {
    return getCookie('token-cook') || '';
  }

  removeToken(): void {
    removeCookie('token-cook');
  }
}
