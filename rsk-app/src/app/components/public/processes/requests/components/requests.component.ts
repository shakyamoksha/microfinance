import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Requests} from '../../../../../shared/schemas/requests';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {RequestsService} from '../services/requests.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['id', 'customer', 'status', 'created', 'payment', 'product', 'open'];
  dataSource: MatTableDataSource<Requests>;

  constructor(private service: RequestsService, private router: Router) { }

  ngOnInit(): void {
    this.loadRefreshTable();
  }

  loadRefreshTable() {
    this.service.getRequestByUser(window.sessionStorage.getItem('user')).subscribe(data => {
      this.dataSource = new MatTableDataSource<Requests>(data.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToRequest(row: any) {
    this.router.navigate([`application`, row.productID, row.id]);
  }
}
