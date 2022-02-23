import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmyaccountComponent } from './editmyaccount.component';

describe('EditmyaccountComponent', () => {
  let component: EditmyaccountComponent;
  let fixture: ComponentFixture<EditmyaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmyaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
