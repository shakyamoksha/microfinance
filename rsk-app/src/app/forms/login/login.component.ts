import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../schemas/user';
import {AuthenticateService} from '../../service/auth/auth-service';
import {Router} from '@angular/router';
import {LoginService} from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  user = new User();

  public loginForm: FormGroup;
  formSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticateService, private service: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginBuilder();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  loginBuilder() {
    this.loginForm = this.formBuilder.group({
      userName: [{value: '', disabled: false}, [Validators.required]],
      password: [{value: '', disabled: false}, [Validators.required]]
    });
  }

  loginFormSubmit = (loginFormValue) => {
    event.preventDefault();
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      const input: User = {
        userName: loginFormValue.userName,
        password: loginFormValue.password
      };
      this.authentication(input);
    }
  }

  authentication(login: any) {
    this.authenticationService.getAuthToken(login).subscribe(data => {
      sessionStorage.setItem('user', login.userName);
      sessionStorage.setItem('token', data.jwt);

      this.service.getUser(login.userName).subscribe(user => {
        if (user !== null) {
          if (user.roles === 'ROLE_USER') {
            sessionStorage.setItem('role', user.roles);
            this.router.navigate(['home']);
          } else if (user.roles === 'ROLE_ADMIN') {
            sessionStorage.setItem('role', user.roles);
            this.router.navigate(['admin']);
          }
        }
      });
    });
  }

}
