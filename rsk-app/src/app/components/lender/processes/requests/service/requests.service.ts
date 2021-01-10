import { Injectable } from '@angular/core';
import {HttpServiceAdmin} from '../../../../../service/http/http.service.admin';
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class RequestsService {

  constructor(private service: HttpServiceAdmin) { }

  getAllRequests() {
    return this.service.get(`/requests/getall`, '');
  }

  getRequestsByStatus(params): Observable<any> {
    return this.service.get(`requests/getRequestsByStatus`, params);
  }

}
