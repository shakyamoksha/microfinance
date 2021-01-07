import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import {RequestsMainComponent} from './components/requests-main/requests-main.component';
import {MaterialModule} from "../../../../shared/material-module";


@NgModule({
  declarations: [RequestsMainComponent],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    MaterialModule
  ]
})
export class RequestsModule { }
