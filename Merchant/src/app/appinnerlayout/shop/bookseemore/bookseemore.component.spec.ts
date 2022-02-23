import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookseemoreComponent } from './bookseemore.component';

describe('BookseemoreComponent', () => {
  let component: BookseemoreComponent;
  let fixture: ComponentFixture<BookseemoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookseemoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookseemoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
