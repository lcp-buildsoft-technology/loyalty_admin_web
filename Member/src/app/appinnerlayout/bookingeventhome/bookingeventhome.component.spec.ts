import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingeventhomeComponent } from './bookingeventhome.component';

describe('BookingeventhomeComponent', () => {
  let component: BookingeventhomeComponent;
  let fixture: ComponentFixture<BookingeventhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingeventhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingeventhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
