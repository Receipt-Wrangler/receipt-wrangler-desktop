import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSelectComponent } from './status-select.component';

describe('StatusSelectComponent', () => {
  let component: StatusSelectComponent;
  let fixture: ComponentFixture<StatusSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusSelectComponent]
    });
    fixture = TestBed.createComponent(StatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
