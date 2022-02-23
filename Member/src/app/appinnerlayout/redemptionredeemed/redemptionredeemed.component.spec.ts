import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedemptionredeemedComponent } from './redemptionredeemed.component';

describe('RedemptionredeemedComponent', () => {
  let component: RedemptionredeemedComponent;
  let fixture: ComponentFixture<RedemptionredeemedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedemptionredeemedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionredeemedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
