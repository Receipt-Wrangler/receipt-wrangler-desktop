import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  Category,
  CategoryService,
  CategoryView,
  SnackbarService,
} from '@receipt-wrangler/receipt-wrangler-core';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss'],
})
export class EditCategoryDialogComponent implements OnInit {
  @Input() public headerText: string = '';

  @Input() public category?: CategoryView;

  public form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<EditCategoryDialogComponent>,
    private categoryService: CategoryService,
    private snackService: SnackbarService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.category?.name],
      description: [this.category?.description],
    });
  }

  public submit(): void {
    if (this.form.valid) {
      const category: Category = {
        id: this.category?.id,
        name: this.form.value.name,
        description: this.form.value.description,
      };
      this.categoryService
        .updateCategory(category, category.id as number)
        .pipe(
          take(1),
          tap(() => {
            this.snackService.success('Category updated successfully');
            this.matDialogRef.close(true);
          })
        )
        .subscribe();
    }
  }

  public closeDialog(): void {
    this.matDialogRef.close(false);
  }
}
