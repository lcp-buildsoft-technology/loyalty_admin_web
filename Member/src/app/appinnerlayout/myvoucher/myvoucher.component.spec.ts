import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyvoucherComponent } from './myvoucher.component';

describe('MyvoucherComponent', () => {
  let component: MyvoucherComponent;
  let fixture: ComponentFixture<MyvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyvoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
