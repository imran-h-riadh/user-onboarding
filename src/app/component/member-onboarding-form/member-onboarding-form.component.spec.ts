import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberOnboardingFormComponent } from './member-onboarding-form.component';

describe('MemberOnboardingFormComponent', () => {
  let component: MemberOnboardingFormComponent;
  let fixture: ComponentFixture<MemberOnboardingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberOnboardingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberOnboardingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
