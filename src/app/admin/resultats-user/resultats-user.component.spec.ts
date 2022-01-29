import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatsUserComponent } from './resultats-user.component';

describe('ResultatsUserComponent', () => {
  let component: ResultatsUserComponent;
  let fixture: ComponentFixture<ResultatsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
