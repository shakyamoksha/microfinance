import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../service/http/http.service';

const SERVER_URL = 'register';

@Injectable({providedIn: 'root'})
export class RegistrationService {

  constructor(private service: HttpService) {}

  registerUser(data) {return this.service.post(`${SERVER_URL}/add`, data); }

  verifyUser(data) {return this.service.post(`${SERVER_URL}/verification`, data); }

}
