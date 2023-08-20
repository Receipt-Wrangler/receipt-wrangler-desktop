import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryDialogComponent } from './edit-category-dialog.component';

describe('EditCategoryDialogComponent', () => {
  let component: EditCategoryDialogComponent;
  let fixture: ComponentFixture<EditCategoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCategoryDialogComponent]
    });
    fixture = TestBed.createComponent(EditCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
