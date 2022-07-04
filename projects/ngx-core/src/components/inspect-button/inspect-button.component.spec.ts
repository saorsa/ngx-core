import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectButtonComponent } from './inspect-button.component';

describe('InspectButtonComponent', () => {
  let component: InspectButtonComponent;
  let fixture: ComponentFixture<InspectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
