import {
  ComponentFixture,
  ComponentFixtureNoNgZone,
  TestBed,
} from '@angular/core/testing';

import { QuickScanDialogComponent } from './quick-scan-dialog.component';
import {
  ApiModule,
  AuthState,
  FileData,
  GroupState,
  PipesModule,
  Receipt,
  ReceiptFileUploadCommand,
  ReceiptService,
  ReceiptStatus,
  SnackbarService,
} from '@receipt-wrangler/receipt-wrangler-core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from 'src/store/store.module';
import { NgxsModule, Store } from '@ngxs/store';
import { LayoutModule } from '@angular/cdk/layout';
import { LayoutState } from 'src/store/layout.state';
import { SelectModule } from 'src/select/select.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { of } from 'rxjs';
import { jsDocComment } from '@angular/compiler';

describe('QuickScanDialogComponent', () => {
  let component: QuickScanDialogComponent;
  let fixture: ComponentFixture<QuickScanDialogComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickScanDialogComponent],
      imports: [
        ApiModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([AuthState, GroupState, LayoutState]),
        SharedUiModule,
        MatSnackBarModule,
        PipesModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(QuickScanDialogComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form correctly', () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      paidByUserId: null,
      status: null,
      groupId: null,
    });
  });

  it('should init form correctly with user preferences', () => {
    component.ngOnInit();
    store.reset({
      auth: {
        userPreferences: {
          quickScanDefaultPaidById: 1,
          quickScanDefaultStatus: ReceiptStatus.OPEN,
          quickScanDefaultGroupId: 1,
        },
      },
    });

    component.ngOnInit();

    expect(component.form.value).toEqual({
      paidByUserId: 1,
      status: ReceiptStatus.OPEN,
      groupId: 1,
    });
  });

  it('should init form correctly in all group', () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      paidByUserId: null,
      status: null,
      groupId: null,
    });
  });

  it('should push fileData into images when loaded', () => {
    spyOn(URL, 'createObjectURL').and.returnValue('awesome');
    const fileData = {} as ReceiptFileUploadCommand;
    component.fileLoaded(fileData);

    expect(component.images).toEqual([fileData]);
  });

  it('should close the dialog', () => {
    const dialogSpy = spyOn(TestBed.inject(MatDialogRef), 'close');

    component.cancelButtonClicked();

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should show error if no image has been selected', () => {
    const snackbarSpy = spyOn(TestBed.inject(SnackbarService), 'error');

    component.submitButtonClicked();

    expect(snackbarSpy).toHaveBeenCalledOnceWith(
      'Please select an image to upload'
    );
  });

  // TODO: fix
  // it('should call API with command', () => {
  //   const serviceSpy = spyOn(
  //     TestBed.inject(ReceiptService),
  //     'quickScanReceipt'
  //   ).and.returnValue(of({} as any));
  //   const fileData = {
  //     fileType: 'image/jpeg',
  //     imageData: '',
  //     name: 'awesome',
  //     size: 100,
  //   } as any;
  //   component.images = [fileData];

  //   store.reset({
  //     auth: {
  //       userId: 1,
  //     },
  //     groups: {
  //       selectedGroupId: 1,
  //     },
  //   });

  //   component.ngOnInit();
  //   component.submitButtonClicked();

  //   expect(serviceSpy).toHaveBeenCalledWith({
  //     imageData: [],
  //     name: 'awesome',
  //     fileType: 'image/jpeg',
  //     size: 100,
  //     groupId: 1,
  //     status: ReceiptStatus.OPEN,
  //     paidByUserId: 1,
  //   });
  // });
});
