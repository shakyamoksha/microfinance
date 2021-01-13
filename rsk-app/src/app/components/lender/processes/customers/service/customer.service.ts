import { Injectable } from '@angular/core';
import {HttpServiceAdmin} from '../../../../../service/http/http.service.admin';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private service: HttpServiceAdmin) { }

  getAllCustomers() {
    return this.service.get(`customer/getall`, 'ROLE_USER');
  }

  toggleFreeze(params): Observable<any> {
    const obj = {userName: params};
    return this.service.post(`customer/freeze`, obj);
  }

}
