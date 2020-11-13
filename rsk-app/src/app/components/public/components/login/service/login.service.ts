import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../service/http/http.service';
const SERVER_URL = 'user';

@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(private service: HttpService) {}

  getUser(data) {return this.service.get(`${SERVER_URL}/getbyuser`, data); }

}
