import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  GroupSettingsEmail,
  SubjectLineRegex,
} from '@receipt-wrangler/receipt-wrangler-core';
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

  @ViewChild(FormListComponent) public formListComponent!: FormListComponent;

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

  public ngOnInit(): void {
    this.group = this.activatedRoute.snapshot.data['group'];
    this.setFormConfigFromRoute(this.activatedRoute);
    this.initForm();
  }

  private initForm(): void {
    this.setInitialValues();
    this.addValidators();
  }

  private addValidators(): void {
    this.emitFormCommand({
      path: 'emailToRead.email',
      command: 'addValidators',
      payload: [Validators.email],
    });
  }

  private setInitialValues(): void {
    const formCommand: FormCommand = {
      path: 'emailToRead',
      command: 'patchValue',
      payload: {
        email: this.group?.groupSettings?.emailToRead?.email,
        groupSettingsId: this.groupSettingsId,
      },
    };
    this.emitFormCommand(formCommand);

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
    groupSettingEmail?: GroupSettingsEmail
  ): FormGroup {
    return this.formBuidler.group({
      email: new FormControl(groupSettingEmail?.email, [
        Validators.email,
        Validators.required,
      ]),
      groupSettingsId: new FormControl(this.groupSettingsId),
    });
  }

  private buildSubjectLineRegexes(regex?: SubjectLineRegex): FormGroup {
    return this.formBuidler.group({
      regex: new FormControl(regex?.regex ?? '', [Validators.required]),
      groupSettingsId: new FormControl(this.groupSettingsId),
    });
  }

  public addSubjectLineRegex(): void {
    this.emitFormCommand({
      path: 'subjectLineRegexes',
      command: 'push',
      payload: this.buildSubjectLineRegexes(),
    });
  }

  public subjectLineItemDoneButtonClicked(): void {
    if (this.form.get('subjectLineRegexes')?.valid) {
      this.formListComponent.resetEditingIndex();
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
}
