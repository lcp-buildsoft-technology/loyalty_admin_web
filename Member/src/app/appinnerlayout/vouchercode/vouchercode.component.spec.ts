import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchercodeComponent } from './vouchercode.component';

describe('VouchercodeComponent', () => {
  let component: VouchercodeComponent;
  let fixture: ComponentFixture<VouchercodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VouchercodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchercodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
