import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../../schemas/user';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {RegistrationService} from '../service/register.service';

export const DateFormat = {
  parse: {dateInput: 'LL', },
  display: {dateInput: 'LL', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'LL', monthYearA11yLabel: 'MMMM YYYY', },
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: DateFormat},
    {provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }}
  ],
})
export class RegisterComponent implements OnInit {
  startDate = new Date(2002, 0, 1);
  currentYear = new Date();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  private minDate: Date;

  constructor(private _formBuilder: FormBuilder, private service: RegistrationService) {
    // const currentYear = new Date().getFullYear();
    // this.minDate = new Date(currentYear - 18, 0, 1);
  }

  ngOnInit(): void {
    this.formGroupBuilt();
    // console.log(this.minDate);
    console.log(this.currentYear);
  }

  formGroupBuilt() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    });
    this.secondFormGroup = this._formBuilder.group({
      nic: ['', [Validators.required, Validators.pattern('^[A-Z][0-9]{13}$')]]
    });
    this.thirdFormGroup = this._formBuilder.group({
      dateOfBirth: [{value: '', disabled: false}, [Validators.required]]
    });
    this.fourthFormGroup = this._formBuilder.group({
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    });
    this.fifthFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^(("[\\w-\\s]+")|([\\w-]+(?:\\.[\\w-]+)*)|("[\\w-\\s]+")([\\w-]+(?:\\.[\\w-]+)*))(@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$)|(@\\[?((25[0-5]\\.|2[0-4][0-9]\\.|1[0-9]{2}\\.|[0-9]{1,2}\\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\]?$)')]],
      password: ['', [Validators.required]],
      // confirmPassword: ['', [Validators.required]],
    });
  }

  processStepperData() {
    const data: User = {
      firstName: this.firstFormGroup.value.firstName,
      lastName: this.firstFormGroup.value.lastName,
      nic: this.secondFormGroup.value.nic,
      dateOfBirth: this.thirdFormGroup.value.dateOfBirth,
      address: this.fourthFormGroup.value.address,
      phone: this.fourthFormGroup.value.phone,
      email: this.fifthFormGroup.value.email,
      password: this.fifthFormGroup.value.password,
      userName: this.fifthFormGroup.value.email
    };

    this.service.registerUser(data).subscribe(response => {
      console.log(response);
    });

  }

  confirmPasswordMatch(first: string, second: string) {

  }
}
