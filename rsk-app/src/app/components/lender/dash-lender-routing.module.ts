import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashLenderComponent} from './dash-lender/dash-lender.component';

const routes: Routes = [
  {path: '', component: DashLenderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashLenderRoutingModule { }
