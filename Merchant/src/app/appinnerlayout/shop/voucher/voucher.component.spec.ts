import { ComponentFixture, TestBed } from '@angular/core/testing';

import { voucherComponent } from './voucher.component';

describe('voucherComponent', () => {
  let component: voucherComponent;
  let fixture: ComponentFixture<voucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ voucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(voucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
