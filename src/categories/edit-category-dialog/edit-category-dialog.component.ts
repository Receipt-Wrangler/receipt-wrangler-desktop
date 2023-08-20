import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryView } from '@receipt-wrangler/receipt-wrangler-core';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss'],
})
export class EditCategoryDialogComponent implements OnInit {
  @Input() public headerText: string = '';

  @Input() public category?: CategoryView;

  public form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.category?.name],
      description: [this.category?.description],
    });
  }
}
