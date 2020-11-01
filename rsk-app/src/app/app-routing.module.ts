import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouteGuardAdminService, RouteGuardService} from './service/routeGuard/route-guard-service';

const routes: Routes = [
  {path: '', loadChildren: () => import('./components/public/dash-public.module').then(m => m.DashPublicModule)},
  {path: 'lender', loadChildren: () => import('./components/lender/dash-lender.module').then(m => m.DashLenderModule)},
  // { path: '**', component: PageNotFoundComponent }
  // {path: '', component: LoginComponent},
  // {path: 'home', component: HomeComponent, canActivate: [RouteGuardService]},
  // {path: 'admin', component: AdminComponent, canActivate: [RouteGuardService, RouteGuardAdminService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
