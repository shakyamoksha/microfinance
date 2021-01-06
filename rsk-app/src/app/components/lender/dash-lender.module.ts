import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashLenderRoutingModule } from './dash-lender-routing.module';
import {CustomersComponent} from './processes/customers/components/customers.component';


@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    DashLenderRoutingModule
  ]
})
export class DashLenderModule { }
