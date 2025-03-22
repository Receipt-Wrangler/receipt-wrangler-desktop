import { Component, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CustomField, CustomFieldType } from "../../open-api/index";

@Component({
  selector: "app-custom-field",
  standalone: false,
  templateUrl: "./custom-field.component.html",
  styleUrl: "./custom-field.component.scss"
})
export class CustomFieldComponent {
  @Input() public formGroup!: FormGroup<{
    receiptId: FormControl<number>;
    customFieldId: FormControl<number>;
    value: FormControl<any>;
  }>;

  @Input() public customFields: CustomField[] = [];
  protected readonly CustomFieldType = CustomFieldType;
}
