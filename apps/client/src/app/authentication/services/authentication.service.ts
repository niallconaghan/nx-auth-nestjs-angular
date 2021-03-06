import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../interfaces/auth-response';
import { Credentials } from '../interfaces/credentials';
import { StorageService } from '../../core/services/storage.service';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  login(credentials: Credentials): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(`${environment.apiUrl}/authentication/login`, credentials)
      .pipe(tap((res: AuthenticationResponse) => {
        this.storageService.set('access_token', res.access_token);
        this.storageService.set('refresh_token', res.refresh_token);
      }))
  }

  register(credentials: Credentials): Observable<Partial<Credentials>> {
    return this.httpClient.post<Partial<Credentials>>(`${environment.apiUrl}/authentication/register`, credentials)
  }

  refresh(): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(`${environment.apiUrl}/authentication/refresh`, {
      refresh_token: this.storageService.get('refresh_token')
    }).pipe(tap((res: AuthenticationResponse) => {
      this.storageService.set('access_token', res.access_token);
      this.storageService.set('refresh_token', res.refresh_token);
    }))
  }

  logout(): void {
    this.storageService.clear();
  }

  isAuthenticated(): boolean {
    return !!this.storageService.get('access_token');
  }
}
