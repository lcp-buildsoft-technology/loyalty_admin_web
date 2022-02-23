import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorereviewComponent } from './storereview.component';

describe('StorereviewComponent', () => {
  let component: StorereviewComponent;
  let fixture: ComponentFixture<StorereviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorereviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorereviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
