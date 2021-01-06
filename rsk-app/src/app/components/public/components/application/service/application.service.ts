import { Injectable } from '@angular/core';
import {HttpService} from '../../../../../service/http/http.service';

@Injectable({providedIn: 'root'})
export class ApplicationService {

  constructor(private service: HttpService) { }

  applyReqquest(params) {
    return this.service.post(`request/initiate`, params);
  }

}
