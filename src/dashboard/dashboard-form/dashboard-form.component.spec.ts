import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFormComponent } from './dashboard-form.component';

describe('DashboardFormComponent', () => {
  let component: DashboardFormComponent;
  let fixture: ComponentFixture<DashboardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardFormComponent]
    });
    fixture = TestBed.createComponent(DashboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
