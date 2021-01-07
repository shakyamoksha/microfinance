import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestsService} from '../../service/requests.service';
import {MatTableDataSource} from '@angular/material/table';
import {Product} from '../../../../../../shared/schemas/product';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from "@angular/router";

@Component({
  selector: 'app-requests-main',
  templateUrl: './requests-main.component.html',
  styleUrls: ['./requests-main.component.css']
})
export class RequestsMainComponent implements OnInit {
  displayedColumns: string[] = ['id', 'customer', 'status', 'createddate', 'open'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private service: RequestsService, private router: Router) { }

  ngOnInit(): void {
    this.loadRefreshTable();
  }

  loadRefreshTable() {
    this.service.getAllRequests().subscribe(data => {
      this.dataSource = new MatTableDataSource<Product>(data);
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
    this.router.navigate([`lender/lender-application`, row]);
  }
}
