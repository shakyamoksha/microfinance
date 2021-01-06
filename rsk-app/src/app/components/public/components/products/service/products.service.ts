import { Injectable } from '@angular/core';
import {HttpService} from '../../../../../service/http/http.service';
const SERVER_URL = '/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private service: HttpService) { }

  getAllProducts() {
    return this.service.get(`${SERVER_URL}/getall`, '');
  }

}
