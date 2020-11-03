import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../interfaces/auth-response';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: Credentials): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(`${environment.apiUrl}/authentication/login`, credentials);
  }

  register(credentials: Credentials): Observable<AuthenticationResponse> {
    return null;
  }
}
