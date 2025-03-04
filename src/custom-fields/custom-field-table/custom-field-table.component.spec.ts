import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldTableComponent } from './custom-field-table.component';

describe('CustomFieldTableComponent', () => {
  let component: CustomFieldTableComponent;
  let fixture: ComponentFixture<CustomFieldTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFieldTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFieldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
