/*
? Initial code
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

} */

import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
import { TokenService } from '@services/token.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class RedirectGuard implements CanActivate {
//   constructor(private tokenService: TokenService, private router: Router) {}

//   canActivate(): boolean | UrlTree {
//     const token = this.tokenService.getToken();
//     if (token) {
//       // this.router.navigate(['/app']);
//       // return false;
//       return this.router.createUrlTree(['/app']);
//     }
//     return true;
//   }
// };

export const redirectGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const routerService = inject(Router);

  if (tokenService.getToken()) {
    routerService.navigate(['/app']);
  }
  return true;
};

//Example of a function that returns a CanActivateFn
export const authGuardFnExample: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const routerService = inject(Router);

  const isValidToken = tokenService.isValidToken();

  if (isValidToken) {
    routerService.createUrlTree(['/app']);
  }
  return true;
};
