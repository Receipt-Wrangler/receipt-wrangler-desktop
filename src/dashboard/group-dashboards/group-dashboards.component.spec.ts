import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDashboardsComponent } from './group-dashboards.component';

describe('GroupDashboardsComponent', () => {
  let component: GroupDashboardsComponent;
  let fixture: ComponentFixture<GroupDashboardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupDashboardsComponent]
    });
    fixture = TestBed.createComponent(GroupDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
