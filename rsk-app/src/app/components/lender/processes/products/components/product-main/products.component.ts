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

  constructor() { }

  ngOnInit(): void {
    this.isRud = true;
  }

  loadTabs(tabChangeEvent: MatTabChangeEvent) {
    if (tabChangeEvent.index === 0) {
      this.isRud = true;
    } else if (tabChangeEvent.index === 1) {
      this.isCreate = true;
    }
  }

}
