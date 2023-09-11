import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListComponent } from './form-list.component';

describe('FormListComponent', () => {
  let component: FormListComponent;
  let fixture: ComponentFixture<FormListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormListComponent]
    });
    fixture = TestBed.createComponent(FormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
