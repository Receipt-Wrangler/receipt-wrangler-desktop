import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTabsComponent } from './group-tabs.component';

describe('GroupTabsComponent', () => {
  let component: GroupTabsComponent;
  let fixture: ComponentFixture<GroupTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupTabsComponent]
    });
    fixture = TestBed.createComponent(GroupTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
