import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McmyaccountComponent } from './mcmyaccount.component';

describe('McmyaccountComponent', () => {
  let component: McmyaccountComponent;
  let fixture: ComponentFixture<McmyaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McmyaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McmyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
