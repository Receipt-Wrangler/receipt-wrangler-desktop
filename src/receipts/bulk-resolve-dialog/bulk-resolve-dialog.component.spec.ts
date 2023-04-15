import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkResolveDialogComponent } from './bulk-resolve-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/pipes/pipes.module';

describe('BulkResolveDialogComponent', () => {
  let component: BulkResolveDialogComponent;
  let fixture: ComponentFixture<BulkResolveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulkResolveDialogComponent],
      imports: [ReactiveFormsModule, PipesModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: (arg: any) => {},
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BulkResolveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form correctly', () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      comment: '',
    });
  });

  it('should init form correctly', () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      comment: '',
    });
  });

  it('should close dialog with undefined', () => {
    const spy = spyOn(component.matDialogRef, 'close');
    component.cancelButtonClicked();

    expect(spy).toHaveBeenCalledWith(undefined);
  });

  it('should close dialog with form value', () => {
    const spy = spyOn(component.matDialogRef, 'close');
    component.form.patchValue({
      comment: 'resolved',
    });
    component.submitButtonClicked();

    expect(spy).toHaveBeenCalledWith({
      comment: 'resolved',
    });
  });
});
