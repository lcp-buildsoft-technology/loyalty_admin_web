import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizevoucherqrComponent } from './prizevoucherqr.component';

describe('PrizevoucherqrComponent', () => {
  let component: PrizevoucherqrComponent;
  let fixture: ComponentFixture<PrizevoucherqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizevoucherqrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizevoucherqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
