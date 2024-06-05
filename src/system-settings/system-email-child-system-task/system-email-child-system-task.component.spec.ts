import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemEmailChildSystemTaskComponent } from './system-email-child-system-task.component';

describe('SystemEmailChildSystemTaskComponent', () => {
  let component: SystemEmailChildSystemTaskComponent;
  let fixture: ComponentFixture<SystemEmailChildSystemTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemEmailChildSystemTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemEmailChildSystemTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
