/* import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    const token = this.tokenService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
} */
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@services/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);

  const isValidToken = tokenService.isValidRefreshToken();
  console.log("🚀 ~ isValidToken:", isValidToken)

  if (!isValidToken) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};
