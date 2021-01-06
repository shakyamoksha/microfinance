import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from '../../service/products.service';
import {MatTableDataSource} from '@angular/material/table';
import {Product} from '../../schema/product';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ConfirmationDialogComponent} from '../../../../../../shared/modals/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-products-rud',
  templateUrl: './products-rud.component.html',
  styleUrls: ['./products-rud.component.css']
})
export class ProductsRudComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'type', 'amount', 'update', 'delete'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: ProductsService, public dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
    console.log('rud loaded');
    this.loadRefreshTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadRefreshTable() {
    this.service.getAllProducts().subscribe(data => {
      this.dataSource = new MatTableDataSource<Product>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateDialog(data: any) {
    console.log(`update`);
  }

  deleteDialog(data: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Confirm deletion of ${data.name} ?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.deleteProduct(data.id).subscribe(result1 => {
          if (result1[`statusCode`] === '200') {
            this.toastr.info(result1[`status`]);
            this.loadRefreshTable();
          } else {
            this.toastr.info(result1[`status`]);
          }
        });
      }
    });
  }
}
