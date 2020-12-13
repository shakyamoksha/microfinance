import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashLenderComponent} from './dash-lender/dash-lender.component';
import {ProductsModule} from './processes/products/products.module';

const routes: Routes = [
  {path: '', component: DashLenderComponent,
    children: [
      {path: '', redirectTo: 'package', pathMatch: 'full'},
      {path: 'package',
      loadChildren: () => import('./processes/package/package.module').then(m => m.PackageModule)},
      {path: 'customers',
      loadChildren: () => import('./processes/customers/customers.module').then(m => m.CustomersModule)},
      {path: 'products',
      loadChildren: () => import('./processes/products/products.module').then(m => m.ProductsModule)}
    ]
  }
  // {path: '', loadChildren: () => import('../public/dash-public.module').then(m => m.DashPublicModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashLenderRoutingModule { }
