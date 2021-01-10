import { Injectable } from '@angular/core';
import {HttpService} from '../../../../../service/http/http.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApplicationService {

  constructor(private service: HttpService) { }

  getProductById(id: number): Observable<any> {
    return this.service.get(`product/getProductById`, id);
  }

  createRequest(params): Observable<any> {
    return this.service.post(`request/create`, params);
  }

  applyReqquest(params): Observable<any> {
    return this.service.post(`request/initiate`, params);
  }

  getUser(params): Observable<any> {
    return this.service.get(`user/getbyuser`, params);
  }

}
