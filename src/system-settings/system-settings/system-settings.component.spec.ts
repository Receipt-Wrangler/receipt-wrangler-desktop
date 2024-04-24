import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsComponent } from './system-settings.component';

describe('SystemSettingsComponent', () => {
  let component: SystemSettingsComponent;
  let fixture: ComponentFixture<SystemSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
