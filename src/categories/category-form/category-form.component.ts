import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  Category,
  CategoryService,
  CategoryView,
  SnackbarService,
} from '@receipt-wrangler/receipt-wrangler-core';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryForm implements OnInit {
  @Input() public headerText: string = '';

  @Input() public category?: CategoryView;

  public form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CategoryForm>,
    private categoryService: CategoryService,
    private snackService: SnackbarService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.category?.name ?? '', Validators.required],
      description: [this.category?.description ?? ''],
    });
  }

  public submit(): void {
    if (this.form.valid && this.category) {
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
    } else if (this.form.valid && !this.category) {
      this.categoryService
        .createCategory(this.form.value as Category)
        .pipe(
          take(1),
          tap(() => {
            this.snackService.success('Category created successfully');
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
