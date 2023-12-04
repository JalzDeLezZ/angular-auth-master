import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';

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

  isValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decodeToken = jwtDecode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
