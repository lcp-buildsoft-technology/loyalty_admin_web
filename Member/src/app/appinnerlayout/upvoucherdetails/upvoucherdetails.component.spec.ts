import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpvoucherdetailsComponent } from './upvoucherdetails.component';

describe('UpvoucherdetailsComponent', () => {
  let component: UpvoucherdetailsComponent;
  let fixture: ComponentFixture<UpvoucherdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpvoucherdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpvoucherdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
