import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemEmailsComponent } from './system-emails.component';

describe('SystemEmailsComponent', () => {
  let component: SystemEmailsComponent;
  let fixture: ComponentFixture<SystemEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemEmailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
