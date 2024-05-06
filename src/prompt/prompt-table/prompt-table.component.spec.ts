import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptTableComponent } from './prompt-table.component';

describe('PromptTableComponent', () => {
  let component: PromptTableComponent;
  let fixture: ComponentFixture<PromptTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromptTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
