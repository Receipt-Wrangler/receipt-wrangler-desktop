import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSettingsEmailComponent } from './group-settings-email.component';

describe('GroupSettingsEmailComponent', () => {
  let component: GroupSettingsEmailComponent;
  let fixture: ComponentFixture<GroupSettingsEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupSettingsEmailComponent]
    });
    fixture = TestBed.createComponent(GroupSettingsEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
