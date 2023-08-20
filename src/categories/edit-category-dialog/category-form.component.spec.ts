import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryForm } from './category-form.component';

describe('CategoryForm', () => {
  let component: CategoryForm;
  let fixture: ComponentFixture<CategoryForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryForm],
    });
    fixture = TestBed.createComponent(CategoryForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
