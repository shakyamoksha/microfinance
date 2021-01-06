import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashLenderComponent} from './dash-lender/dash-lender.component';

const routes: Routes = [
  {path: '', component: DashLenderComponent,
    children: [
      {path: '', redirectTo: 'requests', pathMatch: 'full'},
      {path: 'requests',
      loadChildren: () => import('./processes/requests/requests.module').then(m => m.RequestsModule)},
      {path: 'customers',
      loadChildren: () => import('./processes/customers/customers.module').then(m => m.CustomersModule)},
      {path: 'products',
      loadChildren: () => import('./processes/products/products.module').then(m => m.ProductsModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashLenderRoutingModule { }
