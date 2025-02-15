import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class RequestService {
  private readonly API_URL = environment.host;

  constructor(private http: HttpClient) {}

  request<R>(url: string, payload = {}): Observable<R> {
    return this.http.post<R>(this.API_URL + url, payload);
  }
}
