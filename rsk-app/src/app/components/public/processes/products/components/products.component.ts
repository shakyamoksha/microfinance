import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../service/products.service';
import {AuthenticateService} from '../../../../../service/auth/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productDetails = [];

  constructor(
    private service: ProductsService,
    private authenticateService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe(data => {this.productDetails = data; });
  }

  navigateToApplication(id: any) {
    this.router.navigate([`application`, id]);
  }
}
