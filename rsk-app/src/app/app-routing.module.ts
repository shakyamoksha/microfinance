import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouteGuardAdminService, RouteGuardService} from './service/routeGuard/route-guard-service';

const routes: Routes = [
  {path: '', loadChildren: () => import('./components/public/dash-public.module').then(m => m.DashPublicModule)},
  {path: 'lender', loadChildren: () => import('./components/lender/dash-lender.module').then(m => m.DashLenderModule)},
  // { path: '**', processes: PageNotFoundComponent }
  // {path: '', processes: LoginComponent},
  // {path: 'home', processes: HomeComponent, canActivate: [RouteGuardService]},
  // {path: 'admin', processes: AdminComponent, canActivate: [RouteGuardService, RouteGuardAdminService]},
];

// ng generate module src\app\processes\lender\processes\package\package --route

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
