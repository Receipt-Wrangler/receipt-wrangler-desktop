import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptFormComponent } from './prompt-form.component';

describe('PromptFormComponent', () => {
  let component: PromptFormComponent;
  let fixture: ComponentFixture<PromptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
