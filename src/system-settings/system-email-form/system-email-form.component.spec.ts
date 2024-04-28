import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemEmailFormComponent } from './system-email-form.component';

describe('SystemEmailFormComponent', () => {
  let component: SystemEmailFormComponent;
  let fixture: ComponentFixture<SystemEmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemEmailFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
