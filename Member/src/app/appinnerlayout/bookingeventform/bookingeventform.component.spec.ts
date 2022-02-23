import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingeventformComponent } from './bookingeventform.component';

describe('BookingeventformComponent', () => {
  let component: BookingeventformComponent;
  let fixture: ComponentFixture<BookingeventformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingeventformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingeventformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
