import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsMainComponent } from './requests-main.component';

describe('RequestsMainComponent', () => {
  let component: RequestsMainComponent;
  let fixture: ComponentFixture<RequestsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
