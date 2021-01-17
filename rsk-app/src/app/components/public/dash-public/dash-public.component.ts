import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthenticateService} from '../../../service/auth/auth-service';
import {MatDialog} from '@angular/material/dialog';
import {CustomerDialogComponent} from '../../../shared/modals/customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-dash-public',
  templateUrl: './dash-public.component.html',
  styleUrls: ['./dash-public.component.css']
})
export class DashPublicComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches), shareReplay());

  constructor(private dialog: MatDialog, private breakpointObserver: BreakpointObserver, private authenticateService: AuthenticateService) {}

  ngOnInit(): void {
    this.openCustomerDialog();
  }

  openCustomerDialog() {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '1000px',
      height: '500px',
      data: `Are you sure to apply?`
    });
  }
}
