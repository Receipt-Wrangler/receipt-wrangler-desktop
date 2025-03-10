import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldFormComponent } from './custom-field-form.component';

describe('CustomFieldFormComponent', () => {
  let component: CustomFieldFormComponent;
  let fixture: ComponentFixture<CustomFieldFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomFieldFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFieldFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
