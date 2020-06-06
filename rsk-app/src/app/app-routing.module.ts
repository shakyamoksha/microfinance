import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './forms/login/login.component';
import {HomeComponent} from './forms/user/home/home.component';
import {AdminComponent} from './forms/admin/admin/admin.component';
import {RouteGuardAdminService, RouteGuardService} from './service/routeGuard/route-guard-service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [RouteGuardService]},
  {path: 'admin', component: AdminComponent, canActivate: [RouteGuardService, RouteGuardAdminService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
