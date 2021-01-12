import { Injectable } from '@angular/core';
import {HttpService} from '../../../../../service/http/http.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private service: HttpService) { }

  getRequestByUser(params): Observable<any> {
    return this.service.get(`request/getRequestsByUser`, params);
  }
}
