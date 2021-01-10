import { Injectable } from '@angular/core';
import {HttpServiceAdmin} from '../../../../../service/http/http.service.admin';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private service: HttpServiceAdmin) { }

  getProduct(params): Observable<any> {
    return this.service.get(`product/getProductById`, params);
  }

  getRequest(params): Observable<any> {
    return this.service.get(`requests/getRequestsById`, params);
  }

  updateRequest(params): Observable<any> {
    return this.service.put(`requests/update`, params);
  }

  getAllProducts() {
    return this.service.get(`/product/getall`, '');
  }

}
