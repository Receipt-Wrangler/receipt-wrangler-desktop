import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { take, tap } from "rxjs";
import { CategoryForm } from "../../categories/category-form/category-form.component";
import { FormOption } from "../../interfaces/form-option.interface";
import { CustomField, CustomFieldService, CustomFieldType } from "../../open-api/index";
import { SnackbarService } from "../../services/index";

@Component({
  selector: "app-custom-field-form",
  standalone: false,
  templateUrl: "./custom-field-form.component.html",
  styleUrl: "./custom-field-form.component.scss"
})
export class CustomFieldFormComponent implements OnInit {
  @Input() public headerText: string = "";

  @Input() public customField?: CustomField;

  public typeOptions: FormOption[] = Object.keys(CustomFieldType).map((key) => {
    return {
      value: (CustomFieldType as any)[key],
      displayValue: key,
    };
  });

  public form!: FormGroup;

  constructor(
    private customFieldService: CustomFieldService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CategoryForm>,
    private snackbarService: SnackbarService,
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public submit(): void {
    if (this.form.valid) {
      const command = this.form.value;
      this.customFieldService.createCustomField(command)
        .pipe(
          take(1),
          tap(() => {
            this.snackbarService.success("Custom field created");
            this.matDialogRef.close(true);
          })
        ).subscribe();
    }
  }

  public closeDialog(): void {
    this.matDialogRef.close(false);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.customField?.name, [Validators.required]],
      type: [this.customField?.type, [Validators.required]],
      description: [this.customField?.description],
    });
  }
}
