import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import {ApplicationComponent} from './components/application.component';
import {MaterialModule} from '../../../../shared/material-module';


@NgModule({
  declarations: [ApplicationComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MaterialModule
  ]
})
export class ApplicationModule { }
