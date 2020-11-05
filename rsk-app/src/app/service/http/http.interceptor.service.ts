import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticateService} from '../auth/auth-service';

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getAuthenticatedToken();
    const user = this.authenticationService.getAuthenticatedUser();
    if (token && user) {
      req = req.clone({
        setHeaders : {Authorization : `Bearer ${token}`}
      });
    }

    return next.handle(req);
  }
}
