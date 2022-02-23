import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletdetailComponent } from './outletdetail.component';

describe('OutletdetailComponent', () => {
  let component: OutletdetailComponent;
  let fixture: ComponentFixture<OutletdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
