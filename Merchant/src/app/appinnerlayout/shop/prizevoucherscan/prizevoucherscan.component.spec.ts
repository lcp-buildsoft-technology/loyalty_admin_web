import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizevoucherscanComponent } from './prizevoucherscan.component';

describe('PrizevoucherscanComponent', () => {
  let component: PrizevoucherscanComponent;
  let fixture: ComponentFixture<PrizevoucherscanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizevoucherscanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizevoucherscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
