import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../../schemas/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroupBuilt();
  }

  formGroupBuilt() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      nic: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      dateOfBirth: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    // return this.registerForm.controls[controlName].hasError(errorName);
  }

  processStepperData() {
    const data: User = {
      firstName: this.firstFormGroup.value.firstName,
      lastName: this.firstFormGroup.value.firstName,
      nic: this.secondFormGroup.value.nic,
      dateOfBirth: this.thirdFormGroup.value.dateOfBirth,
      address: this.fourthFormGroup.value.address,
      phone: this.fourthFormGroup.value.phone,
      email: this.fifthFormGroup.value.email,
      password: this.fifthFormGroup.value.password,
    };
    console.log(data);

  }
}
