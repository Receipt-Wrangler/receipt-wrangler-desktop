import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RadioButtonData } from 'src/radio-group/models';

enum QuickActions {
  'SplitEvenly' = 'Split Evenly',
  'SplitEvenlyWithOptionalParts' = 'Split Evenly With Optional Parts',
}

@Component({
  selector: 'app-quick-actions-dialog',
  templateUrl: './quick-actions-dialog.component.html',
  styleUrls: ['./quick-actions-dialog.component.scss'],
})
export class QuickActionsDialogComponent implements OnInit {
  public parentForm!: FormGroup;

  public localForm: FormGroup = new FormGroup({});

  public radioValues: RadioButtonData[] = Object.entries(QuickActions).map(
    (entry) => {
      return {
        displayValue: entry[1],
        value: entry[0],
      } as RadioButtonData;
    }
  );

  public quickActionsEnum = QuickActions;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.localForm = this.formBuilder.group({
      quickAction: [this.radioValues[0].value, Validators.required],
      usersToSplit: [undefined, [Validators.required]],
    });

    this.localForm
      .get('quickAction')
      ?.valueChanges.subscribe((v) => console.warn(v));

    console.warn(this.parentForm.value);
  }
}
