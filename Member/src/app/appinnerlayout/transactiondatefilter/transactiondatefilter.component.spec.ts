import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactiondatefilterComponent } from './transactiondatefilter.component';

describe('TransactiondatefilterComponent', () => {
  let component: TransactiondatefilterComponent;
  let fixture: ComponentFixture<TransactiondatefilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactiondatefilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactiondatefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
