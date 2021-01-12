import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import {RequestsComponent} from './components/requests.component';
import {MaterialModule} from '../../../../shared/material-module';


@NgModule({
  declarations: [RequestsComponent],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    MaterialModule
  ]
})
export class RequestsModule { }
