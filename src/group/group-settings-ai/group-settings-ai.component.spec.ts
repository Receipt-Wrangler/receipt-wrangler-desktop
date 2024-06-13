import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSettingsAiComponent } from './group-settings-ai.component';

describe('GroupSettingsAiComponent', () => {
  let component: GroupSettingsAiComponent;
  let fixture: ComponentFixture<GroupSettingsAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupSettingsAiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupSettingsAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
