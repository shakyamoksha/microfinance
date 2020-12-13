import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
const SERVER_URL = 'http://localhost:8080/admin';

@Injectable({providedIn: 'root'})
export class HttpServiceAdmin {

  constructor(private http: HttpClient) {}

  get(endpoint, params): Observable<any> {
    if (Object.keys(params).length) {
      return this.http.get(`${SERVER_URL}/${endpoint}/${params}`);
    } else {
      return this.http.get(`${SERVER_URL}${endpoint}`);
    }
  }

  delete(endpoint, params) {
    return this.http.delete(`${SERVER_URL}/${endpoint}/${params}`);
  }

  post(endpoint, params) {
    return this.http.post(`${SERVER_URL}/${endpoint}`, params);
  }

  put(endpoint, params) {
    return this.http.put(`${SERVER_URL}/${endpoint}`, params);
  }

}
