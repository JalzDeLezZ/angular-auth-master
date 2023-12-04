import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

//Resource: https://gist.github.com/abereghici/054cefbdcd8ccd3ff03dcc4e5155242b#file-token-interceptor-service-ts

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TOKEN)) {
      const isValidToken = this.tokenService.isValidToken(); // access_token
      if (isValidToken) return this.addToken(request, next);
      return this.updateAccessTokenAndRefreshToken(request, next);
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    if (accessToken) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }

  public updateAccessTokenAndRefreshToken(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ) {
    const refreshToken = this.tokenService.getRefeshToken();
    const isValidRefreshToken = this.tokenService.isValidRefreshToken();
    if (refreshToken && isValidRefreshToken) {
      return this.authService.refreshToken(refreshToken).pipe(
        switchMap(() => {
          return this.addToken(request, next);
        })
      );
    }
    return next.handle(request);
  }
}
