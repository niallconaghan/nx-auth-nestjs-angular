import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StorageService } from '../../core/services/storage.service';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService, private authenticationService: AuthenticationService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/content')) {
      console.log('Intercepting:', request.url);
      const req = this.addBearerToken(request);
      return next.handle(req).pipe(catchError((err) => this.handleError(err, req, next)));
    }
    
    if (request.url.includes('/refresh')) {
      return next.handle(request).pipe(catchError((err) => this.handleRefreshError(err)));
    }

    return next.handle(request);
  }

  private handleError(error: HttpErrorResponse, req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (error.status === 401) {
      console.log('Unauthorized request, requesting new Bearer token with refresh token');
      console.log('attempting', req.url);
      return this.authenticationService.refresh().pipe(switchMap(() => {
        const newRequest = this.addBearerToken(req);
        return next.handle(newRequest);
      }));
    }
    return throwError(error);
  }

  private handleRefreshError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      console.log('Unauthorized request, can not refresh token, logging out');
      this.authenticationService.logout();
      this.router.navigate(['authentication']);
      return of(error.message);
    }
    return throwError(error);
  }

  private addBearerToken(req: HttpRequest<unknown>): HttpRequest<unknown> {
    console.log('Adding Bearer token to request');
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.storageService.get('access_token')}`
      }
    });
  }
}
