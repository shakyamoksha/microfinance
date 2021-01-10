import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsProgressComponent } from './requests-progress.component';

describe('RequestsProgressComponent', () => {
  let component: RequestsProgressComponent;
  let fixture: ComponentFixture<RequestsProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
