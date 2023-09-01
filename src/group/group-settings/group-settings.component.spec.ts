import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSettingsComponent } from './group-settings.component';

describe('GroupSettingsComponent', () => {
  let component: GroupSettingsComponent;
  let fixture: ComponentFixture<GroupSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupSettingsComponent]
    });
    fixture = TestBed.createComponent(GroupSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
