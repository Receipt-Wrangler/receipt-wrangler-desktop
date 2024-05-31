import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BaseFormComponent } from "../../form";
import { FormOption } from "../../interfaces/form-option.interface";
import { ImportType } from "../../open-api";

@Component({
  selector: "app-import-form",
  templateUrl: "./import-form.component.html",
  styleUrl: "./import-form.component.scss"
})
export class ImportFormComponent extends BaseFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  public importTypeOptions: FormOption[] = [
    {
      value: ImportType.ImportConfig,
      displayValue: "Import Config"
    }
  ];

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      importType: [ImportType.ImportConfig, Validators.required],
    });
  }

}
