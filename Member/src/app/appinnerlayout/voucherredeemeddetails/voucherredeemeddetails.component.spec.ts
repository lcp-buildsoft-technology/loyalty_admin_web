import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherredeemeddetailsComponent } from './voucherredeemeddetails.component';

describe('VoucherredeemeddetailsComponent', () => {
  let component: VoucherredeemeddetailsComponent;
  let fixture: ComponentFixture<VoucherredeemeddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherredeemeddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherredeemeddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
