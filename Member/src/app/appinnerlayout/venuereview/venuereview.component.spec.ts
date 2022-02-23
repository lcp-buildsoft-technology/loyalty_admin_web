import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuereviewComponent } from './venuereview.component';

describe('VenuereviewComponent', () => {
  let component: VenuereviewComponent;
  let fixture: ComponentFixture<VenuereviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenuereviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuereviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
