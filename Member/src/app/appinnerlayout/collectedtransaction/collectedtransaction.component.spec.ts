import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectedtransactionComponent } from './collectedtransaction.component';

describe('CollectedtransactionComponent', () => {
  let component: CollectedtransactionComponent;
  let fixture: ComponentFixture<CollectedtransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectedtransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectedtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
