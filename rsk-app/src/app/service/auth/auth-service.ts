import {Injectable} from '@angular/core';
import {AuthService} from '../http/auth.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticateService {

  constructor(private authService: AuthService, private router: Router) {}

  getAuthToken(login) {return this.authService.post(login); }

  getAuthenticatedToken() {return sessionStorage.getItem('token'); }

  getAuthenticatedUser() {return sessionStorage.getItem('user'); }

  isLoggedIn() {
    const user = sessionStorage.getItem('user');
    return !(user === null);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
