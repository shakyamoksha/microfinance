import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DocumentViewComponent} from '../document-view/document-view.component';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordStrengthValidator} from '../../../helpers/password-strengh.validator';
import {MustMatch} from '../../../helpers/must-match.validator';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './customer-dialog.component.html'
})

export class CustomerDialogComponent implements OnInit {
  customerFormGroup: FormGroup;
  public file;
  startDate = new Date(2002, 0, 1);
  constructor(
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.customerFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      nic: ['', [Validators.required, Validators.pattern('^[A-Z][0-9]{13}$')]],
      dateOfBirth: [{value: '', disabled: false}, [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.pattern('^(("[\\w-\\s]+")|([\\w-]+(?:\\.[\\w-]+)*)|("[\\w-\\s]+")([\\w-]+(?:\\.[\\w-]+)*))(@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$)|(@\\[?((25[0-5]\\.|2[0-4][0-9]\\.|1[0-9]{2}\\.|[0-9]{1,2}\\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\]?$)')]],
      password: ['', [
        Validators.required,
        /*** Validators.minLength(10), **/
        PasswordStrengthValidator
      ]],
      confirmPassword: ['', [Validators.required]],
      poa: [this.file, [Validators.required]],
      poi: [this.file, [Validators.required]]
    }, {validator: MustMatch('password', 'confirmPassword')});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  viewFileReadOnly(value: any) {
    if (value) {
      this.dialog.open(DocumentViewComponent, {
        width: '500px',
        data: value
      });
      this.toastr.success('File loaded successfully!');
    } else {
      this.toastr.error('An error occurred!');
    }
  }
}
