import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinestorehomeComponent } from './onlinestorehome.component';

describe('OnlinestorehomeComponent', () => {
  let component: OnlinestorehomeComponent;
  let fixture: ComponentFixture<OnlinestorehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinestorehomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinestorehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
