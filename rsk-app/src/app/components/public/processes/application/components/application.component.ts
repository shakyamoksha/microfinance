import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from '../service/application.service';
import {Requests} from '../../../../../shared/schemas/requests';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../../../shared/modals/confirmation-dialog/confirmation-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DocumentViewComponent} from '../../../../../shared/modals/document-view/document-view.component';

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
  readonly: boolean;
  paymentOption: Array<any> = [
    {id: 6, name: '6 Months'},
    {id: 12, name: '1 Year'},
    {id: 18, name: '1.5 Year'},
    {id: 24, name: '2 Years'},
  ];

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
    if (this.route.snapshot.params[('idd')] !== '0') {
      this.readonly = true;
      this.loadReadOnly();
    }
  }

  initializeForm() {
    this.readonly = false;
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

  loadReadOnly() {
    this.applicationForm.get('applyReason').disable();
    this.applicationForm.get('paymentOption').disable();
    this.applicationForm.get('poa').disable();
    this.applicationForm.get('poi').disable();
    this.applicationForm.get('signature').disable();
    this.service.getRequestByID(this.route.snapshot.params[('idd')]).subscribe(data => {
      this.applicationForm.patchValue({
        applyReason: data.result[0].applyReason,
        paymentOption: data.result[0].paymentOption,
        poa: 'data:application/pdf;base64,' + data.result[0].poa,
        poi: 'data:application/pdf;base64,' + data.result[0].poi,
        signature: 'data:application/pdf;base64,' + data.result[0].signature
      });
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
            this.router.navigate(['requests_customer']);
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
    if (value) {
      this.dialog.open(DocumentViewComponent, {
        width: '500px',
        data: value.files[0]
      });
      this.toastr.success('File loaded successfully!');
    } else {
      this.toastr.error('An error occurred!');
    }
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

  navigateBack() {
    this.router.navigate(['requests_customer']);
  }
}
