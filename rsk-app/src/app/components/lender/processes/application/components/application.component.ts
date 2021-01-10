import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from '../service/application.service';
import {ConfirmationDialogComponent} from '../../../../../shared/modals/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Requests} from '../../../../../shared/schemas/requests';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  requestDetails = [];
  productDetails = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private service: ApplicationService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeService();
  }

  initializeService() {
    this.service.getProduct(this.route.snapshot.params[('idd')]).subscribe(data => {this.productDetails = data.result[0]; });
    this.service.getRequest(this.route.snapshot.params[('id')]).subscribe(data => {this.requestDetails = data.result[0]; });
  }

  approveRequest() {
    const params: Requests = {
      id: this.requestDetails[`id`],
      requestStatus: 'APPROVED',
      modifiedBy: window.sessionStorage.getItem('user'),
      createdBy: this.requestDetails[`createdBy`],
      customerNumber: this.requestDetails[`customerNumber`],
      customerName: this.requestDetails[`customerName`],
      productID: this.requestDetails[`productID`],
      action: 'COMPLETED'
    };
    this.service.updateRequest(params).subscribe(data => {
      if (data.statusCode === '200') {
        this.toastr.success('Request approved');
        this.router.navigate(['lender/requests']);
      } else if (data.statusCode === '400') {
        this.toastr.error('Something went wrong');
      }
      console.log(data);
    });
  }

  rejectRequest() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Reject application?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true ) {
        const params: Requests = {
          id: this.requestDetails[`id`],
          requestStatus: 'REJECTED',
          modifiedBy: window.sessionStorage.getItem('user'),
          createdBy: this.requestDetails[`createdBy`],
          customerNumber: this.requestDetails[`customerNumber`],
          customerName: this.requestDetails[`customerName`],
          productID: this.requestDetails[`productID`],
          action: 'COMPLETED'
        };
        this.service.updateRequest(params).subscribe(data => {
          console.log(data);
          if (data.statusCode === '200') {
            this.toastr.info('Request has been Rejected');
            this.router.navigate(['lender/requests']);
          } else if (data.statusCode === '400') {
            this.toastr.error('Something went wrong');
          }
        });

      }
    });
  }


}
