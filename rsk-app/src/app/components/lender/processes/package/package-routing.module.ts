import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PackageComponent} from './components/package.component';


const routes: Routes = [{path: '', component: PackageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }