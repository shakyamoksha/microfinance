import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import {RequestsMainComponent} from './components/requests-main/requests-main.component';
import {MaterialModule} from '../../../../shared/material-module';
import {RequestsProgressComponent} from './components/requests-progress/requests-progress.component';
import {RequestsCompletedComponent} from './components/requests-completed/requests-completed.component';


@NgModule({
  declarations: [
    RequestsMainComponent,
    RequestsProgressComponent,
    RequestsCompletedComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    MaterialModule
  ]
})
export class RequestsModule { }
