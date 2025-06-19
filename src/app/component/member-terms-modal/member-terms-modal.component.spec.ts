import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTermsModalComponent } from './member-terms-modal.component';

describe('MemberTermsModalComponent', () => {
  let component: MemberTermsModalComponent;
  let fixture: ComponentFixture<MemberTermsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberTermsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberTermsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
