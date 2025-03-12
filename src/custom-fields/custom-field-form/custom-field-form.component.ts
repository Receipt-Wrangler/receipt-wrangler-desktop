import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { CategoryForm } from "../../categories/category-form/category-form.component";
import { FormOption } from "../../interfaces/form-option.interface";
import { CustomField, CustomFieldType } from "../../open-api/index";

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

  constructor(private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<CategoryForm>,) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.customField?.name, [Validators.required]],
      type: [this.customField?.type, [Validators.required]],
      description: [this.customField?.description],
    });
  }

  public submit(): void {

  }

  public closeDialog(): void {
    this.matDialogRef.close(false);
  }
}
