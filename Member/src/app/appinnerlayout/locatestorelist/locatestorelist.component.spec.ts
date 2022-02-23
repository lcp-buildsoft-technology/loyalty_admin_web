import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatestorelistComponent } from './locatestorelist.component';

describe('LocatestorelistComponent', () => {
  let component: LocatestorelistComponent;
  let fixture: ComponentFixture<LocatestorelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatestorelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatestorelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
