import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from '../service/customer.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Requests} from '../../../../../shared/schemas/requests';
import {User} from '../../../../../shared/schemas/user';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['number', 'name', 'username', 'active', 'phone', 'freeze', 'open'];
  dataSource: MatTableDataSource<User>;
  constructor(
    private toastr: ToastrService,
    private service: CustomerService
  ) { }

  ngOnInit(): void {
    this.loadRefreshTable();
  }

  loadRefreshTable() {
    this.service.getAllCustomers().subscribe(data => {
      this.dataSource = new MatTableDataSource<User>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  navigateToRequest(username: any) {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {this.dataSource.paginator.firstPage(); }
  }

  toggleFreeze(userName: string) {
    this.service.toggleFreeze(userName).subscribe(data => {
      if (data.statusCode === '200') {
        this.loadRefreshTable();
        this.toastr.info('Activity status changed!');
      }
    });
  }
}
