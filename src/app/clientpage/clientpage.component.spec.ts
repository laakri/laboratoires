import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientpageComponent } from './clientpage.component';

describe('ClientpageComponent', () => {
  let component: ClientpageComponent;
  let fixture: ComponentFixture<ClientpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
