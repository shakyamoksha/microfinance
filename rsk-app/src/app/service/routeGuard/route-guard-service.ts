import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {LoginService} from '../../forms/login/service/login.service';

@Injectable({providedIn: 'root'})
export class RouteGuardService implements CanActivate {
  constructor(private router: Router,  private service: LoginService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = sessionStorage.getItem('role');
    if (user === 'ROLE_USER') {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}

@Injectable({providedIn: 'root'})
export class RouteGuardAdminService implements CanActivate {
  constructor(private router: Router,  private service: LoginService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = sessionStorage.getItem('role');
    if (user === 'ROLE_ADMIN') {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
