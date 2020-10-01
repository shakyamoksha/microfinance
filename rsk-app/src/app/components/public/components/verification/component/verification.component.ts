import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit, OnDestroy {

  name = 'Angular 8 reactive form with dynamic fields and validations example';
  exampleForm: FormGroup;
  totalSum = 0;
  myFormValueChanges$;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  /**
   * Form initialization
   */
  ngOnInit() {
    // create form with validators and dynamic rows array
    this.exampleForm = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.maxLength(25)]],
      countryName: [''],
      city: [''],
      zipCode: [''],
      street: [''],
      units: this.formBuilder.array([
        // load first row at start
        this.getUnit()
      ])
    });
    // initialize stream on units
    this.myFormValueChanges$ = this.exampleForm.controls['units'].valueChanges;
    // subscribe to the stream so listen to changes on units
    // this.myFormValueChanges$.subscribe(units => this.updateTotalUnitPrice(units));

    // preload some data into form fields
  }

  /**
   * unsubscribe listener
   */
  ngOnDestroy(): void {
    this.myFormValueChanges$.unsubscribe();
  }

  /**
   * Save form data
   */
  save(model: any, isValid: boolean, e: any) {
    e.preventDefault();
    alert('Form data are: ' + JSON.stringify(model));
  }

  /**
   * Create form unit
   */
  private getUnit() {
    const numberPatern = '^[0-9.,]+$';
    return this.formBuilder.group({
      unitName: ['', Validators.required],
      qty: [1, [Validators.required, Validators.pattern(numberPatern)]],
      unitPrice: ['', [Validators.required, Validators.pattern(numberPatern)]],
      unitTotalPrice: [{value: '', disabled: true}]
    });
  }

  /**
   * Add new unit row into form
   */
  addUnit() {
    const control = this.exampleForm.controls['units'] as FormArray;
    control.push(this.getUnit());
  }

  /**
   * Remove unit row from form on click delete button
   */
  removeUnit(i: number) {
    const control = this.exampleForm.controls['units'] as FormArray;
    control.removeAt(i);
  }

  /**
   * This is one of the way how clear units fields.
   */
  clearAllUnits() {
    const control = this.exampleForm.controls['units'] as FormArray;
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
    control.push(this.getUnit());
  }

  /**
   * This is example how patch units array. Before patch you have to create
   * same number of FormArray controls. As we have already one control created
   * by default we start from i = 1 not 0. This way it could be implemented in
   * ngOnInit in case of update just you have to prepare FormArray and then patch
   * whole form object not just units.
   */
  addSomeUnitsFromArrayExample() {
    const unitsArray = [
      {unitName: 'test unit 1', qty: 2, unitPrice: 22.44},
      {unitName: 'test unit 2', qty: 1, unitPrice: 4},
      {unitName: 'test unit 3', qty: 44, unitPrice: 1.50}
    ]
    const control = this.exampleForm.controls['units'] as FormArray;
    for (let i = 1; i < unitsArray.length; i++) {
      control.push(this.getUnit());
    }
    this.exampleForm.patchValue({units: unitsArray});
  }e

}
