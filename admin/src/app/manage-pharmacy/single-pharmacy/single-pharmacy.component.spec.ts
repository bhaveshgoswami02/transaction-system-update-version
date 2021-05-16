import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePharmacyComponent } from './single-pharmacy.component';

describe('SinglePharmacyComponent', () => {
  let component: SinglePharmacyComponent;
  let fixture: ComponentFixture<SinglePharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
