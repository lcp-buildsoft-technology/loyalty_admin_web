import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatestoredetailsComponent } from './locatestoredetails.component';

describe('LocatestoredetailsComponent', () => {
  let component: LocatestoredetailsComponent;
  let fixture: ComponentFixture<LocatestoredetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatestoredetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatestoredetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
