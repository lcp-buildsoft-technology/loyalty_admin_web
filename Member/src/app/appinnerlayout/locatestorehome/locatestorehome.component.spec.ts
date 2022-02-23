import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatestorehomeComponent } from './locatestorehome.component';

describe('LocatestorehomeComponent', () => {
  let component: LocatestorehomeComponent;
  let fixture: ComponentFixture<LocatestorehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatestorehomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatestorehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
