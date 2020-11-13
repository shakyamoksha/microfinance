import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../../schemas/user';
import {AuthenticateService} from '../../../../../service/auth/auth-service';
import {Router} from '@angular/router';
import {LoginService} from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      const role = data.data.authorities[0].authority;
      sessionStorage.setItem('user', login.userName);
      sessionStorage.setItem('token', data.jwt);
      sessionStorage.setItem('role', role);
      if (data !== null) {
        if (role === 'ROLE_USER') {this.router.navigate(['']);
        } else if (role === 'ROLE_ADMIN') {this.router.navigate(['lender']); }
      }
    });
  }

}
