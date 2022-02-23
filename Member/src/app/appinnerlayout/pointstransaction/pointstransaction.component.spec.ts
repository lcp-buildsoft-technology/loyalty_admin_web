import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointstransactionComponent } from './pointstransaction.component';

describe('PointstransactionComponent', () => {
  let component: PointstransactionComponent;
  let fixture: ComponentFixture<PointstransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointstransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointstransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
