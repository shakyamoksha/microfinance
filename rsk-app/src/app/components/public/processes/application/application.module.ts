import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import {ApplicationComponent} from './components/application.component';
import {MaterialModule} from '../../../../shared/material-module';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialFileInputModule} from "ngx-material-file-input";


@NgModule({
  declarations: [ApplicationComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MaterialFileInputModule
  ]
})
export class ApplicationModule { }
