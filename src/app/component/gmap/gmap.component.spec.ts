import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapComponent } from './gmap.component';

describe('GmapComponent', () => {
  let component: GmapComponent;
  let fixture: ComponentFixture<GmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
