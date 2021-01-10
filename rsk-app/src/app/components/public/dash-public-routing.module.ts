import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashPublicComponent} from './dash-public/dash-public.component';

const routes: Routes = [
  {path: '', component: DashPublicComponent,
    children: [
      {path: '', redirectTo: 'landing', pathMatch: 'full'},
      {path: 'landing',
        loadChildren: () => import('./processes/landing-page/landing-page.module').then(m => m.LandingPageModule)},
      {path: 'login',
        loadChildren: () => import('./processes/login/login.module').then(m => m.LoginModule)},
      {path: 'register',
        loadChildren: () => import('./processes/register/register.module').then(m => m.RegisterModule)},
      {path: 'verification/:token/:user',
        loadChildren: () => import('./processes/verification/verification.module').then(m => m.VerificationModule)},
      {path: 'products_customer',
      loadChildren: () => import('./processes/products/products.module').then(m => m.ProductsModule)},
      {path: 'application/:id',
      loadChildren: () => import('./processes/application/application.module').then(m => m.ApplicationModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashPublicRoutingModule { }
