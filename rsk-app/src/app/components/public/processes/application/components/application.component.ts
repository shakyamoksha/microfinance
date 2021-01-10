import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from '../service/application.service';
import {Requests} from '../../../../../shared/schemas/requests';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../../../shared/modals/confirmation-dialog/confirmation-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  productDetails = [];
  userDetails = [];
  applicationForm: FormGroup;
  public file;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private service: ApplicationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeServices();
    this.initializeForm();
  }

  initializeForm() {
    this.applicationForm = this.formBuilder.group({
      applyReason: ['', [Validators.required]],
      paymentOption: ['6', [Validators.required]],
      poa: [this.file, [Validators.required]],
      poi: [this.file, [Validators.required]],
      signature: [this.file, [Validators.required]],
      conditions: new FormControl('', [(control) => {
          return !control.value ? { required: true } : null;
        }]
      )
    });
  }

  initializeServices() {
    this.service.getProductById(this.route.snapshot.params[('id')]).subscribe(data => {this.productDetails = data[`result`][0]; });
    this.service.getUser(sessionStorage.getItem('user')).subscribe(user => {this.userDetails = user; });
  }

  applyTwo() {
    const params: Requests = {
      customerName: this.userDetails[`firstName`] + ' ' + this.userDetails[`lastName`],
      createdBy: this.userDetails[`userName`],
      customerNumber: this.userDetails[`id`],
      modifiedBy: this.userDetails[`userName`],
      productID: this.productDetails[`id`],
      action: 'PROGRESS'
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Are you sure to apply?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.applyReqquest(params).subscribe(data => {this.toastr.success(data.status); });
      }
    });
  }

  apply(rawValue: any) {
    const formData = new FormData();
    const requests = JSON.stringify({
      customerName: this.userDetails[`firstName`] + ' ' + this.userDetails[`lastName`],
      createdBy: this.userDetails[`userName`],
      customerNumber: this.userDetails[`id`],
      modifiedBy: this.userDetails[`userName`],
      productID: this.productDetails[`id`],
      action: 'PROGRESS',
      applyReason: rawValue.applyReason,
      paymentOption: rawValue.paymentOption,
      condition: rawValue.condition
    });
    formData.append('request', requests);
    formData.append('poa', rawValue.poa.files[0]);
    formData.append('poi', rawValue.poi.files[0]);
    formData.append('signature', rawValue.signature.files[0]);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: `Are you sure to apply?`});
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.createRequest(formData).subscribe(data => {
          if (data.statusCode === '200') {
            this.toastr.success(data.status);
            this.router.navigate(['products_customer']);
          } else if (data.statusCode === '400') {
            this.toastr.error(data.error);
          }
        });
      }
    });


  }

  cancelRequest() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: `Are you sure to cancel?`});
    dialogRef.afterClosed().subscribe(result => {if (result === true) {this.router.navigate(['products_customer']); }});
  }

  viewFile(value: any) {
    // const dialogRef = this.dialog.open(, value);
    console.log(value.files[0]);
  }
}
