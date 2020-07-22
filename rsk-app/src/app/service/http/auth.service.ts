import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
const SERVER_URL = 'http://localhost:8080/authenticate';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {}

  post(params): Observable<any> {
    return this.http.post(`${SERVER_URL}`, params);
  }
}
