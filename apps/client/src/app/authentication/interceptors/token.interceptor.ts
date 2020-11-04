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
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes('/content')) {
      console.log('Intercepting:', request.url);

      const access_token = this.storageService.get('access_token');

      console.log('Adding Bearer token to request');
      const req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`
        }
      })

      return next.handle(req).pipe(catchError((err) => this.handleError(err)));
    }
    return next.handle(request);

  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      console.log('Unauthorized request, requesting new Bearer token with refresh token');


      return of(error.message);
    }
    return throwError(error);
  }
}
