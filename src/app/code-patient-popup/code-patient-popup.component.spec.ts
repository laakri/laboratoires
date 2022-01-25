import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePatientPopupComponent } from './code-patient-popup.component';

describe('CodePatientPopupComponent', () => {
  let component: CodePatientPopupComponent;
  let fixture: ComponentFixture<CodePatientPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodePatientPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePatientPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
