import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashLenderRoutingModule } from './dash-lender-routing.module';
import {CustomersComponent} from './processes/customers/components/customers.component';
import {MaterialModule} from '../../shared/material-module';


@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    DashLenderRoutingModule,
    MaterialModule
  ]
})
export class DashLenderModule { }
