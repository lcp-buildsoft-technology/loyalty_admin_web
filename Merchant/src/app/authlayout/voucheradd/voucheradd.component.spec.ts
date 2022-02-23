import { ComponentFixture, TestBed } from '@angular/core/testing';

import { voucheraddComponent } from './voucheradd.component';

describe('voucheraddComponent', () => {
  let component: voucheraddComponent;
  let fixture: ComponentFixture<voucheraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ voucheraddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(voucheraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
