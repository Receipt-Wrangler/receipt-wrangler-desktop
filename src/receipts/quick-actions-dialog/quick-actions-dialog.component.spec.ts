import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { PipesModule } from '@receipt-wrangler/receipt-wrangler-core';
import { QuickActionsDialogComponent } from './quick-actions-dialog.component';

describe('QuickActionsDialogComponent', () => {
  let component: QuickActionsDialogComponent;
  let fixture: ComponentFixture<QuickActionsDialogComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };

  const mockSnackBar = {
    open: jasmine.createSpy('open'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickActionsDialogComponent],
      imports: [NgxsModule.forRoot([]), PipesModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickActionsDialogComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.localForm).toBeDefined();
  });

  it('should add even split items', () => {
    component.parentForm = new FormGroup({
      amount: new FormControl('100'),
      receiptItems: new FormArray([]),
    });
    component.ngOnInit();

    const users = [
      { id: 1, displayName: 'User 1' },
      { id: 2, displayName: 'User 2' },
    ];

    const formArray = component.localForm.get('usersToSplit') as FormArray;
    users.forEach((u) => {
      formArray.push(
        new FormGroup({
          id: new FormControl(u.id.toString()),
          displayName: new FormControl(u.displayName),
        })
      );
    });

    component.localForm.patchValue({
      quickAction: component.radioValues[0].value,
    });
    component.addSplits();

    const receiptItems = component.parentForm.get('receiptItems') as FormArray;

    expect(receiptItems.length).toBe(2);
    expect(receiptItems.at(0).get('amount')?.value).toBe(50);
    expect(receiptItems.at(1).get('amount')?.value).toBe(50);
  });

  it('should split evenly with optional parts', () => {
    component.parentForm = new FormGroup({
      amount: new FormControl('100'),
      receiptItems: new FormArray([]),
    });
    component.ngOnInit();

    const formArray = component.localForm.get('usersToSplit') as FormArray;
    const users = [
      { id: 1, displayName: 'User 1' },
      { id: 2, displayName: 'User 2' },
    ];
    users.forEach((u) => {
      formArray.push(
        new FormGroup({
          id: new FormControl(u.id.toString()),
          displayName: new FormControl(u.displayName),
        })
      );
    });
    component.localForm.patchValue({
      quickAction: component.radioValues[1].value,
    });
    component.localForm.addControl('1', new FormControl('10'));
    component.localForm.addControl('2', new FormControl('20'));

    component.addSplits();

    const receiptItems = component.parentForm.get('receiptItems') as FormArray;

    console.log(component.parentForm.get('receiptItems')?.value);

    // TODO: Fix
    expect(receiptItems.length).toBe(4);
    // expect(receiptItems.at(0).get('amount')?.value).toBe(10);
    // expect(receiptItems.at(1).get('amount')?.value).toBe(20);
    // expect(receiptItems.at(2).get('amount')?.value).toBe(35);
    // expect(receiptItems.at(3).get('amount')?.value).toBe(35);
  });
});
