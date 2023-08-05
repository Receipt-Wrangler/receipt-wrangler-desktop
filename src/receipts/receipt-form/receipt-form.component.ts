import {
  distinctUntilChanged,
  finalize,
  forkJoin,
  iif,
  map,
  Observable,
  of,
  skip,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { CarouselComponent } from 'src/carousel/carousel/carousel.component';
import { DEFAULT_DIALOG_CONFIG, DEFAULT_HOST_CLASS } from 'src/constants';
import { RECEIPT_STATUS_OPTIONS } from 'src/constants/receipt-status-options';
import { FormMode } from 'src/enums/form-mode.enum';
import { UserAutocompleteComponent } from 'src/user-autocomplete/user-autocomplete/user-autocomplete.component';

import {
  Component,
  EmbeddedViewRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import {
  Category,
  FeatureConfigState,
  FileData,
  Group,
  GroupMember,
  GroupState,
  Receipt,
  ReceiptImageService,
  ReceiptService,
  SnackbarService,
  Tag,
  UserState,
} from '@receipt-wrangler/receipt-wrangler-core';

import { addHours, format } from 'date-fns';
import { ItemListComponent } from '../item-list/item-list.component';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { formatImageData } from '../utils/form.utils';

@UntilDestroy()
@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss'],
  host: DEFAULT_HOST_CLASS,
})
export class ReceiptFormComponent implements OnInit {
  @ViewChild(ItemListComponent) public itemsListComponent!: ItemListComponent;

  @ViewChild(UploadImageComponent)
  public uploadImageComponent!: UploadImageComponent;

  @ViewChild('paidByAutocomplete')
  public paidByAutocomplete!: UserAutocompleteComponent;

  @ViewChild('successDuplciateSnackbar')
  public successDuplciateSnackbar!: TemplateRef<any>;

  @ViewChild('quickActionsDialog')
  public quickActionsDialog!: TemplateRef<any>;

  @ViewChild(ItemListComponent)
  public itemListComponent!: ItemListComponent;

  @ViewChild(CarouselComponent)
  public carouselComponent!: CarouselComponent;

  @Select(GroupState.groups) public groups!: Observable<Group[]>;

  @Select(GroupState.receiptListLink)
  public receiptListLink!: Observable<string>;

  @Select(FeatureConfigState.aiPoweredReceipts)
  public aiPoweredReceipts!: Observable<boolean>;

  public categories: Category[] = [];

  public tags: Tag[] = [];

  public originalReceipt?: Receipt;

  public images: FileData[] = [];

  public mode: FormMode = FormMode.view;

  public formMode = FormMode;

  public groupRole = GroupMember.GroupRoleEnum;

  public editLink = '';

  public cancelLink = '';

  public imagesLoading: boolean = false;

  public showImages: boolean = true;

  public usersToOmit: string[] = [];

  public duplicatedReceiptId: string = '';

  public duplicatedSnackbarRef!: MatSnackBarRef<EmbeddedViewRef<any>>;

  public formHeaderText: Observable<string> = of('');

  public receiptStatusOptions = RECEIPT_STATUS_OPTIONS;

  constructor(
    private receiptService: ReceiptService,
    private receiptImageService: ReceiptImageService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    private matDialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  public form: FormGroup = new FormGroup({});

  public ngOnInit(): void {
    this.categories = this.activatedRoute.snapshot.data['categories'];
    this.tags = this.activatedRoute.snapshot.data['tags'];
    this.originalReceipt = this.activatedRoute.snapshot.data['receipt'];
    this.editLink = `/receipts/${this.originalReceipt?.id}/edit`;
    this.mode = this.activatedRoute.snapshot.data['mode'];
    this.setCancelLink();
    this.initForm();
    this.getImageFiles();
    this.setHeaderText();
    this.listenForParamChanges();
  }

  private setHeaderText(): void {
    this.formHeaderText = (
      this.form.get('name') as AbstractControl
    ).valueChanges.pipe(
      startWith(this.form.get('name')?.value),
      untilDestroyed(this),
      map((name) => {
        let action = '';
        switch (this.mode) {
          case FormMode.add:
            action = 'Add';
            break;
          case FormMode.view:
            action = 'View';
            break;
          case FormMode.edit:
            action = 'Edit';
            break;
        }

        return `${action} ${name} Receipt`;
      })
    );
  }

  private listenForParamChanges(): void {
    this.activatedRoute.params
      .pipe(
        distinctUntilChanged(),
        skip(1),
        tap(() => {
          location.reload();
        })
      )
      .subscribe();
  }

  private setCancelLink(): void {
    const selectedGroupId = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );
    this.cancelLink = `/receipts/group/${selectedGroupId}`;
  }

  private initForm(): void {
    const selectedGroupId = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );
    this.form = this.formBuilder.group({
      name: [this.originalReceipt?.name ?? '', Validators.required],
      amount: [
        this.originalReceipt?.amount ?? '',
        [Validators.required, Validators.min(1)],
      ],
      categories: this.formBuilder.array(
        this.originalReceipt?.categories ?? []
      ),
      tags: this.formBuilder.array(this.originalReceipt?.tags ?? []),
      date: [this.originalReceipt?.date ?? new Date(), Validators.required],
      paidByUserId: [
        this.originalReceipt?.paidByUserId ?? '',
        Validators.required,
      ],
      groupId: [
        this.originalReceipt?.groupId ?? Number(selectedGroupId),
        Validators.required,
      ],
      status: this.originalReceipt?.status ?? Receipt.StatusEnum.OPEN,
    });

    if (this.mode === FormMode.view) {
      this.form.get('status')?.disable();
    }

    this.listenForGroupChanges();
  }

  private listenForGroupChanges(): void {
    this.form
      .get('groupId')
      ?.valueChanges.pipe(
        untilDestroyed(this),
        startWith(this.form.get('groupId')?.value),
        tap((groupId) => {
          const paidBy = this.form.get('paidByUserId');
          const users = this.store.selectSnapshot(UserState.users);
          if (!groupId) {
            this.usersToOmit = users.map((u) => u.id.toString());
            this.paidByAutocomplete?.autocompleteComponent?.clearFilter();
          } else {
            const group = this.store.selectSnapshot(
              GroupState.getGroupById(groupId)
            );
            const groupMembers = group?.groupMembers.map((u) =>
              u.userId.toString()
            );
            this.usersToOmit = users
              .filter((u) => !groupMembers?.includes(u.id.toString()))
              .map((u) => u.id.toString());
          }
        })
      )
      .subscribe();
  }

  private getImageFiles(): void {
    if (
      this.originalReceipt?.imageFiles &&
      this.originalReceipt?.imageFiles?.length > 0
    ) {
      this.imagesLoading = true;
      this.originalReceipt?.imageFiles.forEach((file) => {
        this.receiptImageService
          .getReceiptImageById(file.id)
          .pipe(
            tap((data) => {
              // TODO: clean this up
              file.imageData = data.encodedImage as any;
              this.images.push(file);
            }),
            finalize(() => (this.imagesLoading = false))
          )
          .subscribe();
      });
    }
  }

  public openQuickActionsModal(): void {
    const dialogRef = this.matDialog.open(
      this.quickActionsDialog,
      DEFAULT_DIALOG_CONFIG
    );

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        if (result) {
          this.itemsListComponent.setUserItemMap();
        }
      });
  }

  public removeImage(): void {
    const index = this.carouselComponent.currentlyShownImageIndex;

    if (this.mode === FormMode.add) {
      this.images.splice(index, 1);
    } else {
      const image = this.images[index];
      this.receiptImageService
        .deleteReceiptImageById(image.id)
        .pipe(
          tap(() => {
            this.images.splice(index, 1);
            this.snackbarService.success('Image successfully removed');
          })
        )
        .subscribe();
    }
  }

  public magicFill(): void {
    const index = this.carouselComponent.currentlyShownImageIndex;
    const receiptImage = this.images[index];
    const formattedReceiptImage = formatImageData(receiptImage, 0);

    let data;
    let receiptImageId = receiptImage?.id;

    if (this.mode === FormMode.add) {
      data = {
        imageData: formattedReceiptImage.imageData,
        filename: receiptImage.name,
      };
    }

    this.receiptImageService
      .magicFillReceipt(data, receiptImageId)
      .pipe(
        take(1),
        tap((magicFilledReceipt) => {
          this.patchMagicValues(magicFilledReceipt);
        })
      )
      .subscribe();
  }

  private patchMagicValues(magicReceipt: Receipt): void {
    const keysWithDefaults = {
      name: '',
      amount: '0',
      date: '0001-01-01T00:00:00Z',
    } as any;
    const validKeys: string[] = [];
    Object.keys(keysWithDefaults).forEach((key) => {
      let value = (magicReceipt as any)[key] as string;
      if (value && value !== keysWithDefaults[key]) {
        validKeys.push(key);
        if (key === 'date') {
          value = this.formatMagicFilledDate(value);
        }
        this.form.patchValue({
          [key]: value,
        });
      }
    });

    if (validKeys.length > 0) {
      const successString = `Magic fill successfully filled ${validKeys.join(
        ', '
      )} from selected image!`;
      this.snackbarService.success(successString, {
        duration: 10000,
      });
    } else {
      this.snackbarService.error(
        'Could not find any values to fill! Try reuploading a clearer image.'
      );
    }
  }

  private formatMagicFilledDate(date: string): string {
    const dateObj = addHours(
      new Date(date),
      new Date().getTimezoneOffset() / 60
    );
    return dateObj.toISOString();
  }

  public groupDisplayWith(id: number): string {
    const group = this.store.selectSnapshot(
      GroupState.getGroupById(id?.toString())
    );

    if (group) {
      return group.name;
    }
    return '';
  }

  public uploadImageButtonClicked(): void {
    this.uploadImageComponent.clickInput();
  }

  public updateComments(commentsArray: FormArray): void {
    this.form.removeControl('comments');
    this.form.addControl('comments', commentsArray);
  }

  public duplicateReceipt(): void {
    this.receiptService
      .duplicateReceipt(this.originalReceipt?.id as number)
      .pipe(
        take(1),
        tap((r: Receipt) => {
          this.duplicatedReceiptId = r.id.toString();
          this.duplicatedSnackbarRef = this.snackbarService.successFromTemplate(
            this.successDuplciateSnackbar,
            { duration: 8000 }
          );
        })
      )
      .subscribe();
  }

  public closeSuccessDuplicateSnackbar(): void {
    this.duplicatedSnackbarRef.dismiss();
  }

  public toggleShowImages(): void {
    this.showImages = !this.showImages;
  }

  public zoomImageIn(): void {
    this.carouselComponent.zoomIn();
  }

  public zoomImageOut(): void {
    this.carouselComponent.zoomOut();
  }

  public initItemListAddMode(): void {
    this.itemListComponent.initAddMode();
  }

  public submit(): void {
    const selectedGroupId = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );
    if (this.itemsListComponent.userExpansionPanels.length > 0) {
      this.itemsListComponent.userExpansionPanels.forEach(
        (p: MatExpansionPanel) => p.close()
      );
    }
    if (this.originalReceipt && this.form.valid) {
      this.receiptService
        .updateReceipt(this.form.value, this.originalReceipt.id as number)
        .pipe(
          take(1),
          tap(() => {
            this.snackbarService.success('Successfully updated receipt');
            this.router.navigate([
              `/receipts/${this.originalReceipt?.id}/view`,
            ]);
          })
        )
        .subscribe();
    } else if (this.mode === FormMode.add && this.form.valid) {
      let route: string;
      this.receiptService
        .createReceipt(this.form.value)
        .pipe(
          take(1),
          tap((r: Receipt) => {
            this.snackbarService.success('Successfully added receipt');
            route = `/receipts/${r.id}/view`;
          }),
          switchMap((r) =>
            iif(
              () => this.images.length > 0,
              forkJoin(
                this.images.map((image) =>
                  this.receiptImageService.uploadReceiptImage(
                    formatImageData(image, r.id)
                  )
                )
              ),
              of('')
            )
          ),
          tap(() => {
            this.router.navigate([route]);
          })
        )
        .subscribe();
    }
  }
}
