import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormMode } from 'src/enums/form-mode.enum';
import { FormConfig } from 'src/interfaces';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss'],
})
export class UserPreferencesComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  public formConfig!: FormConfig;

  public formMode = FormMode;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.formConfig = this.activatedRoute.snapshot.data['formConfig'];
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      quickScanDefaultPaidById: '',
      quickScanDefaultGroupId: '',
      quickScanDefaultStatus: '',
    });
  }

  public submit(): void {
    if (this.form.valid) {
    }
  }
}
