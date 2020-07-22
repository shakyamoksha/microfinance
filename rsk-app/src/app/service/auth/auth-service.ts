import {Injectable} from '@angular/core';
import {AuthService} from '../http/auth.service';
import {HttpService} from '../http/http.service';

@Injectable({providedIn: 'root'})
export class AuthenticateService {

  constructor(private authService: AuthService) {}

  getAuthToken(login) {return this.authService.post(login); }

  getAuthenticatedToken() {return sessionStorage.getItem('token'); }

  getAuthenticatedUser() {return sessionStorage.getItem('user'); }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

}
