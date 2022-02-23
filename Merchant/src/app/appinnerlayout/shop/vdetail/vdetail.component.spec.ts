import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VdetailComponent } from './vdetail.component';

describe('VdetailComponent', () => {
  let component: VdetailComponent;
  let fixture: ComponentFixture<VdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
