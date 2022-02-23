import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopvoucheraddComponent } from './voucheradd.component';

describe('ShopvoucheraddComponent', () => {
  let component: ShopvoucheraddComponent;
  let fixture: ComponentFixture<ShopvoucheraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopvoucheraddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopvoucheraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
