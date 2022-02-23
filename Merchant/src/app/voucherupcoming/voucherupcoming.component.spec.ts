import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherupcomingComponent } from './voucherupcoming.component';

describe('VoucherupcomingComponent', () => {
  let component: VoucherupcomingComponent;
  let fixture: ComponentFixture<VoucherupcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherupcomingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherupcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
