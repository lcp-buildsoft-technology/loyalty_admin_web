import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaystaskComponent } from './todaystask.component';

describe('TodaystaskComponent', () => {
  let component: TodaystaskComponent;
  let fixture: ComponentFixture<TodaystaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaystaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaystaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
