import { Component, Input, OnInit } from '@angular/core';
import {
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
}
