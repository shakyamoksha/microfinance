import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './service/http/http.interceptor.service';
import {MaterialModule} from './shared/material-module';
import { DashPublicComponent } from './components/public/dash-public/dash-public.component';
import {RouterModule} from '@angular/router';
import { DashLenderComponent } from './components/lender/dash-lender/dash-lender.component';
import { VerificationComponent } from './components/public/processes/verification/component/verification.component';
import {ToastrModule} from 'ngx-toastr';
import {ConfirmationDialogComponent} from './shared/modals/confirmation-dialog/confirmation-dialog.component';
import {DocumentViewComponent} from './shared/modals/document-view/document-view.component';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";

@NgModule({
  entryComponents: [ConfirmationDialogComponent, DocumentViewComponent],
  declarations: [
    AppComponent,
    DashPublicComponent,
    DashLenderComponent,
    VerificationComponent,
    ConfirmationDialogComponent,
    DocumentViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
