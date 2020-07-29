import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './service/http/http.interceptor.service';
import {MaterialModule} from './material-module';
import { DashPublicComponent } from './components/public/dash-public/dash-public.component';
import {RouterModule} from '@angular/router';
import { DashLenderComponent } from './components/lender/dash-lender/dash-lender.component';
import { LandingPageComponent } from './components/public/components/landing-page/components/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DashPublicComponent,
    DashLenderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
