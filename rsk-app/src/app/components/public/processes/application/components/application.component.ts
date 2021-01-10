import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../service/application.service';
import {Requests} from '../../../../../shared/schemas/requests';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../../../shared/modals/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  productDetails = [];
  userDetails = [];
  constructor(private route: ActivatedRoute, private toastr: ToastrService, private service: ApplicationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeServices();
  }

  initializeServices() {
    this.service.getProductById(this.route.snapshot.params[('id')]).subscribe(data => {this.productDetails = data[`result`][0]; });
    this.service.getUser(sessionStorage.getItem('user')).subscribe(user => {this.userDetails = user; });
  }

  apply() {
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

}
