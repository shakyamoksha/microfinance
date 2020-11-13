import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashLenderRoutingModule } from './dash-lender-routing.module';
import {PackageComponent} from './processes/package/components/package.component';
import {CustomersComponent} from './processes/customers/components/customers.component';


@NgModule({
  declarations: [PackageComponent, CustomersComponent],
  imports: [
    CommonModule,
    DashLenderRoutingModule
  ]
})
export class DashLenderModule { }
