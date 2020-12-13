import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../service/products.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css']
})
export class ProductsCreateComponent implements OnInit {
  productCreateForm: FormGroup;
  private formSubmitted: boolean;

  constructor(private _formBuilder: FormBuilder, private service: ProductsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log('create loaded');
    this.productCreateForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  productFormSubmit = (rawValue: any) => {
    this.formSubmitted = true;
    if (this.productCreateForm.valid) {
      this.service.createProduct(rawValue).subscribe(data => {
        if (data[`statusCode`] === '200') {
          this.productCreateForm.reset();
          this.toastr.success('Saved Successfully');
        } else {
          this.toastr.error('A server error happened!');
        }
      });
    }


  }

}
