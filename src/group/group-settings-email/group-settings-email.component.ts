import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Group,
  GroupSettingsWhiteListEmail,
  SubjectLineRegex,
} from '@receipt-wrangler/receipt-wrangler-core';
import { startWith, tap } from 'rxjs';
import { FormMode } from 'src/enums/form-mode.enum';
import { BaseFormComponent, FormCommand } from 'src/form';
import { FormListComponent } from 'src/shared-ui/form-list/form-list.component';

@Component({
  selector: 'app-group-settings-email',
  templateUrl: './group-settings-email.component.html',
  styleUrls: ['./group-settings-email.component.scss'],
})
export class GroupSettingsEmailComponent
  extends BaseFormComponent
  implements OnInit
{
  @Input() public override form: FormGroup = new FormGroup({});

  @ViewChildren(FormListComponent)
  public formListComponents!: QueryList<FormListComponent>;

  public group!: Group;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuidler: FormBuilder
  ) {
    super();
  }

  public get groupSettingsId(): number | undefined {
    return this.group?.groupSettings?.id;
  }

  public get subjectLineRegexes(): FormArray {
    return this.form.get('subjectLineRegexes') as FormArray;
  }

  public get emailWhiteList(): FormArray {
    return this.form.get('emailWhiteList') as FormArray;
  }

  public ngOnInit(): void {
    this.group = this.activatedRoute.snapshot.data['group'];
    this.setFormConfigFromRoute(this.activatedRoute);
    this.initForm();
  }

  private initForm(): void {
    this.setInitialValues();
    this.addValidators();
    this.listenForEnableEmailIntegrationChanges();
    if (this.formConfig.mode === FormMode.view) {
      this.form.get('emailIntegrationEnabled')?.disable();
    }
  }

  private listenForEnableEmailIntegrationChanges(): void {
    const control = this.form.get('emailIntegrationEnabled');

    control?.valueChanges
      .pipe(
        startWith(control.value),
        tap((enabled) => {
          if (enabled) {
            this.emitFormCommand({
              path: 'emailToRead',
              command: 'addValidators',
              payload: [Validators.required],
            });
            this.emitFormCommand({
              path: 'emailDefaultReceiptStatus',
              command: 'addValidators',
              payload: [Validators.required],
            });
            this.emitFormCommand({
              path: 'emailDefaultReceiptPaidById',
              command: 'addValidators',
              payload: [Validators.required],
            });
          } else {
            this.emitFormCommand({
              path: 'emailToRead',
              command: 'removeValidators',
              payload: [Validators.required],
            });
            this.emitFormCommand({
              path: 'emailDefaultReceiptStatus',
              command: 'removeValidators',
              payload: [Validators.required],
            });
            this.emitFormCommand({
              path: 'emailDefaultReceiptPaidById',
              command: 'removeValidators',
              payload: [Validators.required],
            });

            const errors = control.errors;

            if (errors?.['required']) {
              delete errors['required'];
            }

            this.emitFormCommand({
              path: 'emailToRead',
              command: 'setErrors',
              payload: {
                required: null,
              },
            });
            this.emitFormCommand({
              path: 'emailDefaultReceiptStatus',
              command: 'setErrors',
              payload: {
                required: null,
              },
            });
            this.emitFormCommand({
              path: 'emailDefaultReceiptPaidById',
              command: 'setErrors',
              payload: {
                required: null,
              },
            });
          }
          this.emitFormCommand({
            path: 'emailToRead',
            command: 'updateValueAndValidity',
          });
          this.emitFormCommand({
            path: 'emailDefaultReceiptStatus',
            command: 'updateValueAndValidity',
          });
          this.emitFormCommand({
            path: 'emailDefaultReceiptPaidById',
            command: 'updateValueAndValidity',
          });
        })
      )
      .subscribe();
  }

  private addValidators(): void {
    this.emitFormCommand({
      path: 'emailToRead',
      command: 'addValidators',
      payload: [Validators.email],
    });
  }

  private setInitialValues(): void {
    this.emitFormCommand({
      path: 'emailIntegrationEnabled',
      command: 'patchValue',
      payload: this.group?.groupSettings?.emailIntegrationEnabled,
    });

    const formCommand: FormCommand = {
      path: 'emailToRead',
      command: 'patchValue',
      payload: this.group?.groupSettings?.emailToRead,
    };
    this.emitFormCommand(formCommand);

    this.emitFormCommand({
      path: 'emailDefaultReceiptStatus',
      command: 'patchValue',
      payload: this.group?.groupSettings?.emailDefaultReceiptStatus,
    });

    this.emitFormCommand({
      path: 'emailDefaultReceiptPaidById',
      command: 'patchValue',
      payload: this.group?.groupSettings?.emailDefaultReceiptPaidById,
    });

    const groupSettingsEmails = (
      this.group?.groupSettings?.emailWhiteList || []
    ).map((email) => this.buildGroupSettingsEmail(email));

    groupSettingsEmails.forEach((groupSettingsEmail) => {
      this.emitFormCommand({
        path: 'emailWhiteList',
        command: 'push',
        payload: groupSettingsEmail,
      });
    });

    const subjectLineRegexes = (
      this.group?.groupSettings?.subjectLineRegexes || []
    ).map((regex) => this.buildSubjectLineRegexes(regex));

    subjectLineRegexes.forEach((regex) => {
      this.emitFormCommand({
        path: 'subjectLineRegexes',
        command: 'push',
        payload: regex,
      });
    });
  }

  private buildGroupSettingsEmail(
    groupSettingEmail?: GroupSettingsWhiteListEmail
  ): FormGroup {
    return this.formBuidler.group({
      email: new FormControl(groupSettingEmail?.email, [
        Validators.email,
        Validators.required,
      ]),
    });
  }

  private buildSubjectLineRegexes(regex?: SubjectLineRegex): FormGroup {
    return this.formBuidler.group({
      regex: new FormControl(regex?.regex ?? '', [Validators.required]),
    });
  }

  public addSubjectLineRegex(): void {
    this.emitFormCommand({
      path: 'subjectLineRegexes',
      command: 'push',
      payload: this.buildSubjectLineRegexes(),
    });
  }

  public itemDoneButtonClicked(index: number): void {
    if (this.form.valid) {
      this.formListComponents.get(index)?.resetEditingIndex();
    }
  }

  public subjectLineItemCancelButtonClicked(): void {
    const lastIndex = this.subjectLineRegexes.length - 1;
    const formCommand: FormCommand = {
      path: 'subjectLineRegexes',
      command: 'removeAt',
      payload: lastIndex,
    };
    this.emitFormCommand(formCommand);
  }

  public subjectLineItemDeleteButtonClicked(index: number): void {
    const formCommand: FormCommand = {
      path: 'subjectLineRegexes',
      command: 'removeAt',
      payload: index,
    };
    this.emitFormCommand(formCommand);
  }

  public addEmailWhiteList(): void {
    this.emitFormCommand({
      path: 'emailWhiteList',
      command: 'push',
      payload: this.buildGroupSettingsEmail(),
    });
  }

  public emailWhiteListItemCancelButtonClicked(): void {
    const lastIndex = this.emailWhiteList.length - 1;
    const formCommand: FormCommand = {
      path: 'emailWhiteList',
      command: 'removeAt',
      payload: lastIndex,
    };
    this.emitFormCommand(formCommand);
  }

  public emailWhiteListItemDeleteButtonClicked(index: number): void {
    const formCommand: FormCommand = {
      path: 'emailWhiteList',
      command: 'removeAt',
      payload: index,
    };
    this.emitFormCommand(formCommand);
  }
}
