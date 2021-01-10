import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Requests} from '../../../../../../shared/schemas/requests';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {RequestsService} from '../../service/requests.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-requests-progress',
  templateUrl: './requests-progress.component.html',
  styleUrls: ['./requests-progress.component.css']
})
export class RequestsProgressComponent implements OnInit, OnChanges {
  @Input() callComponent;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['id', 'customer', 'status', 'created', 'product', 'open'];
  dataSource: MatTableDataSource<Requests>;
  constructor(private service: RequestsService, private router: Router) { }

  ngOnInit(): void {
    this.loadRefreshTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.callComponent > 0) {
      this.ngOnInit();
    }
  }

  loadRefreshTable() {
    this.service.getRequestsByStatus('PROGRESS').subscribe(data => {
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
    this.router.navigate([`lender/lender-application`, row.id, row.productID]);
  }

}
