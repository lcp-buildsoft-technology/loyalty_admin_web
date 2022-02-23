import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementdetailsComponent } from './advertisementdetails.component';

describe('AdvertisementdetailsComponent', () => {
  let component: AdvertisementdetailsComponent;
  let fixture: ComponentFixture<AdvertisementdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
