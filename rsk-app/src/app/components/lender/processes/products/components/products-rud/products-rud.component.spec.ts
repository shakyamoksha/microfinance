import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRudComponent } from './products-rud.component';

describe('ProductsRudComponent', () => {
  let component: ProductsRudComponent;
  let fixture: ComponentFixture<ProductsRudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsRudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsRudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
