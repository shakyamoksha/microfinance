import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashPublicRoutingModule } from './dash-public-routing.module';
import {LoginComponent} from './processes/login/component/login.component';
import {MaterialModule} from '../../shared/material-module';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './processes/register/component/register.component';
import {LandingPageComponent} from './processes/landing-page/components/landing-page.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    DashPublicRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DashPublicModule { }
