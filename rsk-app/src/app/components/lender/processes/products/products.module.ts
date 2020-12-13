import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {ProductsComponent} from './components/product-main/products.component';
import {MaterialModule} from '../../../../material-module';
import {ProductsRudComponent} from './components/products-rud/products-rud.component';
import {ProductsCreateComponent} from './components/products-create/products-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfirmationDialogComponent} from '../../../../shared/modals/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  entryComponents: [
    ConfirmationDialogComponent
  ],
  declarations: [
    ProductsComponent,
    ProductsRudComponent,
    ProductsCreateComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
