import { Injectable } from '@angular/core';
import {HttpServiceAdmin} from '../../../../../service/http/http.service.admin';

@Injectable({providedIn: 'root'})
export class RequestsService {

  constructor(private service: HttpServiceAdmin) { }

  getAllRequests() {
    return this.service.get(`/requests/getall`, '');
  }

}
