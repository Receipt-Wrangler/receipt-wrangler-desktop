import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSettingsEmailComponent } from './group-settings-email.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  PipesModule as CorePipesModule,
  Group,
  GroupSettings,
  ReceiptStatus,
} from '@receipt-wrangler/receipt-wrangler-core';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

describe('GroupSettingsEmailComponent', () => {
  let component: GroupSettingsEmailComponent;
  let fixture: ComponentFixture<GroupSettingsEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupSettingsEmailComponent],
      imports: [MatSnackBarModule, PipesModule, CorePipesModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                formConfig: {},
                group: { id: 1 },
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(GroupSettingsEmailComponent);

    component = fixture.componentInstance;
    component.form = new FormGroup({
      emailToRead: new FormControl(''),
      emailWhiteList: new FormArray([]),
      subjectLineRegexes: new FormArray([]),
      emailDefaultReceiptStatus: new FormControl(''),
      emailDefaultReceiptPaidById: new FormControl(''),
      emailIntegrationEnabled: new FormControl(false),
    });
    component.formCommand.subscribe((command) =>
      component.handleFormCommand(command)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form with empty values', () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      emailToRead: undefined,
      emailIntegrationEnabled: undefined,
      subjectLineRegexes: [],
      emailWhiteList: [],
      emailDefaultReceiptStatus: undefined,
      emailDefaultReceiptPaidById: undefined,
    });

    const form = component.form;
    expect(
      form.get('emailToRead')?.hasValidator(Validators.required)
    ).toBeFalse();
    expect(form.get('emailToRead')?.hasValidator(Validators.email)).toBeTrue();

    expect(
      form.get('emailDefaultReceiptStatus')?.hasValidator(Validators.required)
    ).toBeFalse();
    expect(
      form.get('emailDefaultReceiptPaidById')?.hasValidator(Validators.required)
    ).toBeFalse();
  });

  it('should init form with initial data', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    const group: Group = {
      id: 1,
      groupSettings: {
        id: 1,
        groupId: 1,
        emailIntegrationEnabled: true,
        emailToRead: 'test@test.com',
        subjectLineRegexes: [
          {
            regex: 'test',
          },
        ],
        emailWhiteList: [
          {
            email: 'oneHundred@test.com',
          },
          {
            email: 'twoHundred@test.com',
          },
        ],
        emailDefaultReceiptStatus: ReceiptStatus.OPEN,
        emailDefaultReceiptPaidById: 1,
      },
    } as any;
    activatedRoute.snapshot.data = {
      ...activatedRoute.snapshot.data,
      group: group,
    };

    component.ngOnInit();

    expect(component.form.value).toEqual({
      emailToRead: 'test@test.com',
      emailIntegrationEnabled: true,
      subjectLineRegexes: [{ regex: 'test' }],
      emailWhiteList: [
        {
          email: 'oneHundred@test.com',
        },
        {
          email: 'twoHundred@test.com',
        },
      ],
      emailDefaultReceiptStatus: 'OPEN',
      emailDefaultReceiptPaidById: 1,
    });

    const form = component.form;
    expect(
      form.get('emailToRead')?.hasValidator(Validators.required)
    ).toBeTrue();
    expect(form.get('emailToRead')?.hasValidator(Validators.email)).toBeTrue();

    expect(
      form.get('emailDefaultReceiptStatus')?.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      form.get('emailDefaultReceiptPaidById')?.hasValidator(Validators.required)
    ).toBeTrue();
  });
});
