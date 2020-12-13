import { Injectable } from '@angular/core';
import {HttpServiceAdmin} from '../../../../../service/http/http.service.admin';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private service: HttpServiceAdmin) { }

  getAllProducts() {
    return this.service.get(`/product/getall`, '');
  }

  createProduct(params) {
    return this.service.post(`product/create`, params);
  }

  updateProduct(params) {
    return this.service.put(`/product/update`, params);
  }

  deleteProduct(params) {
    return this.service.delete(`product/delete`, params);
  }

}
