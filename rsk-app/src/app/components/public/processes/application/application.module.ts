import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import {ApplicationComponent} from './components/application.component';
import {MaterialModule} from '../../../../shared/material-module';
import {ConfirmationDialogComponent} from '../../../../shared/modals/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  entryComponents: [ConfirmationDialogComponent],
  declarations: [ApplicationComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MaterialModule
  ]
})
export class ApplicationModule { }
