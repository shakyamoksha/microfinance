import { Component, OnInit } from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  isCreate: boolean;
  isRud: boolean;
  crudIncre = 0;

  constructor() { }

  ngOnInit(): void {
    this.isRud = true;
  }

  changeTab($event: MatTabChangeEvent) {
    if ($event.index === 0) {
      this.crudIncre++;
      this.isRud = true;
    } else if ($event.index === 1) {
      this.isCreate = true;
    }
  }

}
