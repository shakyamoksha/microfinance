import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashPublicComponent} from './dash-public/dash-public.component';
import {LandingPageComponent} from './components/landing-page/components/landing-page.component';


const routes: Routes = [
  {path: '', component: DashPublicComponent,
    children: [
      {path: '', redirectTo: 'landing', pathMatch: 'full'},
      {path: 'landing', component: LandingPageComponent},
      {path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)},
      {path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashPublicRoutingModule { }
