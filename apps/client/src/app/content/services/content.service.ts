import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpClient: HttpClient) { }

  getContent(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/authentication/content`);
  }
}
