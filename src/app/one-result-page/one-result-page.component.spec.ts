import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneResultPageComponent } from './one-result-page.component';

describe('OneResultPageComponent', () => {
  let component: OneResultPageComponent;
  let fixture: ComponentFixture<OneResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneResultPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
