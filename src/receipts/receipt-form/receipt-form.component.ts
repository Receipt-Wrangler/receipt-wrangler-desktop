import { Component, EmbeddedViewRef, HostListener, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatExpansionPanel } from "@angular/material/expansion";
import { MatSnackBarRef } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Select, Store } from "@ngxs/store";
import { addHours } from "date-fns";
import { finalize, forkJoin, iif, map, Observable, of, startWith, switchMap, take, tap } from "rxjs";
import { CarouselComponent } from "src/carousel/carousel/carousel.component";
import { DEFAULT_DIALOG_CONFIG, DEFAULT_HOST_CLASS } from "src/constants";
import { RECEIPT_STATUS_OPTIONS } from "src/constants/receipt-status-options";
import { FormMode } from "src/enums/form-mode.enum";
import { LayoutState } from "src/store/layout.state";
import { HideProgressBar, ShowProgressBar } from "src/store/layout.state.actions";
import { UserAutocompleteComponent } from "src/user-autocomplete/user-autocomplete/user-autocomplete.component";
import { ReceiptFileUploadCommand } from "../../interfaces";
import {
  Category,
  CustomField,
  CustomFieldValue,
  FileDataView,
  Group,
  GroupRole,
  Item,
  Receipt,
  ReceiptImageService,
  ReceiptService,
  ReceiptStatus,
  Tag,
  UserPreferences
} from "../../open-api";
import { CustomFieldTypePipe } from "../../pipes/custom-field-type.pipe";
import { SnackbarService } from "../../services";
import { QueueMode, ReceiptQueueService } from "../../services/receipt-queue.service";
import { StatefulMenuItem } from "../../standalone/components/filtered-stateful-menu/stateful-menu-item";
import { AuthState, FeatureConfigState, GroupState, UserState } from "../../store";
import { downloadFile } from "../../utils/file";
import { ItemListComponent } from "../item-list/item-list.component";
import { UploadImageComponent } from "../upload-image/upload-image.component";
import { buildItemForm } from "../utils/form.utils";

@UntilDestroy()
@Component({
  selector: "app-receipt-form",
  templateUrl: "./receipt-form.component.html",
  styleUrls: ["./receipt-form.component.scss"],
  providers: [CustomFieldTypePipe],
  host: DEFAULT_HOST_CLASS,
  standalone: false
})
export class ReceiptFormComponent implements OnInit {
  @ViewChild(ItemListComponent) public itemsListComponent!: ItemListComponent;

  @ViewChild(UploadImageComponent)
  public uploadImageComponent!: UploadImageComponent;

  @ViewChild("paidByAutocomplete")
  public paidByAutocomplete!: UserAutocompleteComponent;

  @ViewChild("successDuplicateSnackbar")
  public successDuplicateSnackbar!: TemplateRef<any>;

  @ViewChild("quickActionsDialog")
  public quickActionsDialog!: TemplateRef<any>;

  @ViewChild("expandedImageTemplate")
  public expandedImageTemplate!: TemplateRef<any>;

  @ViewChild(ItemListComponent)
  public itemListComponent!: ItemListComponent;

  @ViewChild(CarouselComponent)
  public carouselComponent!: CarouselComponent;

  @Select(GroupState.groupsWithoutAll)
  public groups!: Observable<Group[]>;

  @Select(GroupState.receiptListLink)
  public receiptListLink!: Observable<string>;

  @Select(FeatureConfigState.aiPoweredReceipts)
  public aiPoweredReceipts!: Observable<boolean>;

  @Select(LayoutState.showProgressBar)
  public showProgressBar!: Observable<boolean>;

  @Select(AuthState.userPreferences)
  public userPreferences!: Observable<UserPreferences>;

  protected readonly FormMode = FormMode;

  public categories: Category[] = [];

  public tags: Tag[] = [];

  public customFields: CustomField[] = [];

  public customFieldsStatefulMenuItems: StatefulMenuItem[] = [];

  public originalReceipt?: Receipt;

  public images: FileDataView[] = [];

  public filesToUpload: ReceiptFileUploadCommand[] = [];

  public mode: FormMode = FormMode.view;

  public formMode = FormMode;

  public groupRole = GroupRole;

  public selectedGroup: Group | undefined;

  public editLink = "";

  public cancelLink = "";

  public submitButtonText = "Save";

  public imagesLoading: boolean = false;

  public showImages: boolean = true;

  public usersToOmit: string[] = [];

  public duplicatedReceiptId: string = "";

  public duplicatedSnackbarRef!: MatSnackBarRef<EmbeddedViewRef<any>>;

  public formHeaderText: Observable<string> = of("");

  public receiptStatusOptions = RECEIPT_STATUS_OPTIONS;

  public showLargeImagePreview: boolean = false;

  public queueIds: string[] = [];

  public queueIndex: number = -1;

  public queueMode: QueueMode | undefined;

  public triggerItemListAddMode: boolean = false;

  public get customFieldsFormArray(): FormArray {
    return this.form.get("customFields") as FormArray;
  }

  public get receiptItemsFormArray(): FormArray {
    return this.form.get("receiptItems") as FormArray;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private customFieldTypePipe: CustomFieldTypePipe,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private receiptImageService: ReceiptImageService,
    private receiptQueueService: ReceiptQueueService,
    private receiptService: ReceiptService,
    private router: Router,
    private snackbarService: SnackbarService,
    private store: Store,
  ) {}

  @HostListener("window:keydown", ["$event"])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    const isBodyActive = document.activeElement === document.body;
    if (event.key === "ArrowRight" && isBodyActive && this.queueIds.length > 0) {
      this.queueNext();
    } else if (event.key === "ArrowLeft" && isBodyActive && this.queueIds.length > 0) {
      this.queuePrevious();
    }
  }

  public form: FormGroup = new FormGroup({});

  public ngOnInit(): void {
    this.categories = this.activatedRoute.snapshot.data["categories"] ?? [];
    this.tags = this.activatedRoute.snapshot.data["tags"] ?? [];
    this.customFields = this.activatedRoute.snapshot.data["customFields"] ?? [];
    this.originalReceipt = this.activatedRoute.snapshot.data["receipt"];
    this.editLink = `/receipts/${this.originalReceipt?.id}/edit`;
    this.mode = this.activatedRoute.snapshot.data["mode"];
    this.customFieldsStatefulMenuItems = this.customFields.map(c => {
      const selected = this.originalReceipt?.customFields.some(customField => customField.customFieldId === c.id) ?? false;

      return {
        value: c.id.toString(),
        subtitle: this.customFieldTypePipe.transform(c.type),
        displayValue: c.name,
        selected: selected
      };
    });
    this.setCancelLink();
    this.initForm();
    this.getImageFiles();
    this.setHeaderText();
    this.setShowLargeImagePreview();
    this.setQueueData();
    document.scrollingElement?.scrollTo(0, 0);
  }

  private setQueueData(): void {
    this.queueIds = this.activatedRoute.snapshot.queryParams["ids"] ?? [];
    if (this.queueIds.length > 0) {
      this.queueIndex = this.queueIds.indexOf(this.originalReceipt?.id.toString() ?? "");
    }

    if (this.queueIndex != this.queueIds.length - 1) {
      this.submitButtonText = "Save & Next";
    }

    this.queueMode = this.activatedRoute.snapshot.queryParams["queueMode"];
  }

  private setShowLargeImagePreview(): void {
    this.showLargeImagePreview = this.store.selectSnapshot(AuthState.userPreferences)?.showLargeImagePreviews ?? false;
  }

  private setHeaderText(): void {
    this.formHeaderText = (
      this.form.get("name") as AbstractControl
    ).valueChanges.pipe(
      startWith(this.form.get("name")?.value),
      untilDestroyed(this),
      map((name) => {
        let action = "";
        switch (this.mode) {
          case FormMode.add:
            action = "Add";
            break;
          case FormMode.view:
            action = "View";
            break;
          case FormMode.edit:
            action = "Edit";
            break;
        }

        return `${action} ${name} Receipt`;
      })
    );
  }

  private setCancelLink(): void {
    const selectedGroupId = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );
    this.cancelLink = `/receipts/group/${selectedGroupId}`;
  }

  private initForm(): void {
    let selectedGroupId: number | string = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );
    const group = this.store.selectSnapshot(GroupState.getGroupById(selectedGroupId));

    if (group?.isAllGroup) {
      selectedGroupId = "";
    } else {
      selectedGroupId = Number(selectedGroupId);
    }
    this.form = this.formBuilder.group({
      name: [this.originalReceipt?.name ?? "", Validators.required],
      amount: [
        this.originalReceipt?.amount ?? "",
        [Validators.required, Validators.min(1)],
      ],
      categories: this.formBuilder.array(
        this.originalReceipt?.categories ?? []
      ),
      tags: this.formBuilder.array(this.originalReceipt?.tags ?? []),
      date: [this.originalReceipt?.date ?? new Date(), Validators.required],
      paidByUserId: [
        this.originalReceipt?.paidByUserId ?? "",
        Validators.required,
      ],
      groupId: [
        this.originalReceipt?.groupId ?? selectedGroupId,
        Validators.required,
      ],
      status: this.originalReceipt?.status ?? ReceiptStatus.Open,
      customFields: this.formBuilder.array(this.originalReceipt?.customFields?.map((customField) => this.buildCustomOptionFormGroup(customField)) ?? []),
      receiptItems: this.formBuilder.array(
        this.originalReceipt?.receiptItems
          ? this.originalReceipt.receiptItems.map((item) =>
            buildItemForm(item, this.originalReceipt?.id?.toString())
          )
          : []
      )
    });

    if (this.mode === FormMode.view) {
      this.form.get("status")?.disable();
    }

    this.listenForGroupChanges();
  }

  private buildCustomOptionFormGroup(value: CustomFieldValue): FormGroup {
    return this.formBuilder.group({
      receiptId: this.originalReceipt?.id ?? 0,
      customFieldId: value.customFieldId,
      stringValue: value?.stringValue ?? null,
      dateValue: value?.dateValue ?? null,
      selectValue: value?.selectValue ?? null,
      currencyValue: value?.currencyValue ?? null,
      booleanValue: value?.booleanValue ?? false,
    });
  }

  private listenForGroupChanges(): void {
    this.form
      .get("groupId")
      ?.valueChanges.pipe(
      untilDestroyed(this),
      startWith(this.form.get("groupId")?.value),
      tap((groupId) => {
        const paidBy = this.form.get("paidByUserId");
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
          this.selectedGroup = group;
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
              this.images = [...this.images, data];
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
      const newImages = Array.from(this.filesToUpload);
      newImages.splice(index, 1);
      this.filesToUpload = newImages;
    } else {
      const newImages = Array.from(this.images);
      const image = this.images[index];
      this.receiptImageService
        .deleteReceiptImageById(image.id)
        .pipe(
          tap(() => {
            newImages.splice(index, 1);
            this.images = newImages;
            this.snackbarService.success("Image successfully removed");
          })
        )
        .subscribe();
    }
  }

  public magicFill(): void {
    const index = this.carouselComponent.currentlyShownImageIndex;

    let file: Blob | undefined;
    let receiptImageId;

    if (this.mode === FormMode.add) {
      file = this.filesToUpload[index].file;
    } else if (this.mode === FormMode.edit) {
      const receiptImage = this.images[index];
      receiptImageId = receiptImage?.id;
    }

    this.store.dispatch(new ShowProgressBar());
    this.receiptImageService
      .magicFillReceipt(receiptImageId, file)
      .pipe(
        take(1),
        tap((magicFilledReceipt) => {
          this.patchMagicValues(magicFilledReceipt);
        }),
        finalize(() => this.store.dispatch(new HideProgressBar()))
      )
      .subscribe();
  }

  private patchMagicValues(magicReceipt: Receipt): void {
    const keysWithDefaults = {
      name: "",
      amount: "0",
      date: "0001-01-01T00:00:00Z",
      categories: null,
      tags: null,
    } as any;
    const validKeys: string[] = [];
    Object.keys(keysWithDefaults).forEach((key) => {
      let value = (magicReceipt as any)[key] as string | Date;
      if (value && value !== keysWithDefaults[key]) {
        switch (key) {
          case "categories":
            this.handleCategoryAndTagMagicFill(
              key,
              magicReceipt?.categories ?? [],
              this.categories
            );
            break;
          case "tags":
            this.handleCategoryAndTagMagicFill(
              key,
              magicReceipt?.tags ?? [],
              this.tags
            );
            break;
          case "date":
            value = this.handleDateMagicFill(value as string);
            this.form.patchValue({
              date: value,
            });
            break;
          default:
            this.patchMagicValue(key, magicReceipt);
        }

        validKeys.push(key);
      }
    });

    if (validKeys.length > 0) {
      const successString = `Magic fill successfully filled ${validKeys.join(
        ", "
      )} from selected image!`;
      this.snackbarService.success(successString, {
        duration: 10000,
      });
    } else {
      this.snackbarService.error(
        "Could not find any values to fill! Try reuploading a clearer image."
      );
    }
  }

  private patchMagicValue(key: string, magicReceipt: Receipt): void {
    this.form.patchValue({
      [key]: (magicReceipt as any)[key],
    });
  }

  private handleDateMagicFill(value: string): Date {
    return this.formatMagicFilledDate(value);
  }

  private handleCategoryAndTagMagicFill(
    formKey: "categories" | "tags",
    value: Category[] | Tag[],
    arrayToFilter: Category[] | Tag[]
  ): void {
    const itemsToPush = (arrayToFilter as any[]).filter((item) =>
      value.map((foundItem) => foundItem.id)?.includes(item.id)
    );
    const itemsFormArray = this.form.get(formKey) as FormArray;
    itemsToPush.forEach((c) => {
      itemsFormArray.push(this.formBuilder.control(c));
    });
  }

  private formatMagicFilledDate(date: string): Date {
    const dateObj = addHours(
      new Date(date),
      new Date().getTimezoneOffset() / 60
    );
    return dateObj;
  }

  public uploadImageButtonClicked(): void {
    this.uploadImageComponent.clickInput();
  }

  public updateComments(commentsArray: FormArray): void {
    this.form.removeControl("comments");
    this.form.addControl("comments", commentsArray);
  }

  public duplicateReceipt(): void {
    this.receiptService
      .duplicateReceipt(this.originalReceipt?.id as number)
      .pipe(
        take(1),
        tap((r: Receipt) => {
          this.duplicatedReceiptId = r.id.toString();
          this.duplicatedSnackbarRef = this.snackbarService.successFromTemplate(
            this.successDuplicateSnackbar,
            { duration: 8000 }
          );
        })
      )
      .subscribe();
  }

  public imageFileLoaded(command: ReceiptFileUploadCommand): void {
    switch (this.mode) {
      case FormMode.add:
        this.filesToUpload = [...this.filesToUpload, command];
        break;
      case FormMode.edit:
        this.receiptImageService
          .uploadReceiptImage(
            command.file,
            this.originalReceipt?.id as number,
            ""
          )
          .pipe(
            tap((data) => {
              this.snackbarService.success("Successfully uploaded image(s)");
              this.images = [...Array.from(this.images), data];
            })
          )
          .subscribe();
        break;

      default:
        break;
    }
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

  public toggleImagePreviewSize(): void {
    this.showLargeImagePreview = !this.showLargeImagePreview;
  }

  public expandImage(): void {
    this.matDialog.open(this.expandedImageTemplate, {
      width: "75%",
      height: "100%",
    });
  }

  // TODO: Add functionality to dashboard
  public downloadImage(): void {
    const currentImage = this.images[this.carouselComponent.currentlyShownImageIndex];
    this.receiptImageService.downloadReceiptImageById(currentImage.id)
      .pipe(
        take(1),
        tap((blob) => {
          downloadFile(blob, currentImage.name);
        })
      )
      .subscribe();
  }

  public initItemListAddMode(): void {
    this.triggerItemListAddMode = true;
    // Reset the trigger after a short delay to allow for re-triggering
    setTimeout(() => this.triggerItemListAddMode = false, 100);
  }

  public onItemAdded(item: Item): void {
    const newFormGroup = buildItemForm(item, this.originalReceipt?.id?.toString());
    this.receiptItemsFormArray.push(newFormGroup);
    this.itemListComponent.setUserItemMap();
  }

  public onItemRemoved(data: { item: Item; arrayIndex: number }): void {
    this.receiptItemsFormArray.removeAt(data.arrayIndex);
    this.itemListComponent.setUserItemMap();
  }

  public onAllItemsResolved(userId: string): void {
    // The actual item status updates are handled by the child component
    // We don't need to do anything here as the form will reflect the changes
  }

  public queueNext(): void {
    if (this.queueIndex < this.queueIds.length - 1) {
      this.receiptQueueService.queueNext(this.queueIndex, this.queueIds, this.queueMode ?? QueueMode.VIEW,);
    }
  }

  public queuePrevious(): void {
    if (this.queueIndex > 0) {
      this.receiptQueueService.queuePrevious(this.queueIndex, this.queueIds, this.queueMode ?? QueueMode.VIEW,);
    }
  }

  public customFieldChanged(item: StatefulMenuItem): void {
    const newCustomFields = Array.from(this.customFieldsStatefulMenuItems);
    const selectedItemIndex = this.customFieldsStatefulMenuItems.findIndex(customField => customField.value === item.value);

    newCustomFields[selectedItemIndex] = {
      ...item,
      selected: !item.selected
    };

    this.customFieldsStatefulMenuItems = newCustomFields;

    // Custom field was just selected
    if (this.customFieldsStatefulMenuItems[selectedItemIndex].selected) {
      const customField = this.customFields.find(customField => customField.id === Number(item.value));
      if (customField) {
        const customFieldValue = {
          customFieldId: customField.id,
          receiptId: this.originalReceipt?.id ?? 0,
          value: null
        } as any as CustomFieldValue;
        this.customFieldsFormArray.push(this.buildCustomOptionFormGroup(customFieldValue));
      }
    } else {
      // Custom field was just removed
      const formArrayIndex = this.customFieldsFormArray.controls.findIndex(control => control.value?.["customFieldId"]?.toString() === item.value);
      this.customFieldsFormArray.removeAt(formArrayIndex);
    }
  }

  private updateCustomFields(): void {
    const formArray = this.customFieldsFormArray;

    this.customFieldsStatefulMenuItems.forEach((item) => {

    });
  }

  public submit(): void {
    if (this.itemsListComponent.userExpansionPanels.length > 0) {
      this.itemsListComponent.userExpansionPanels.forEach(
        (p: MatExpansionPanel) => p.close()
      );
    }
    if (this.form.invalid) {
      return;
    }

    if (this.originalReceipt) {
      this.updateReceipt();
    } else if (this.mode === FormMode.add) {
      this.createReceipt();
    }
  }

  private createReceipt(): void {
    let route: string;
    this.receiptService
      .createReceipt(this.form.value)
      .pipe(
        take(1),
        tap((r: Receipt) => {
          this.snackbarService.success("Successfully added receipt");
          route = `/receipts/${r.id}/view`;
        }),
        switchMap((receipt) =>
          iif(
            () => this.filesToUpload.length > 0,
            forkJoin(
              this.filesToUpload.map((file) => {
                return this.receiptImageService.uploadReceiptImage(
                  file.file,
                  receipt.id,
                  ""
                );
              })
            ),
            of("")
          )
        ),
        tap(() => {
          this.router.navigate([route]);
        })
      )
      .subscribe();
  }

  private updateReceipt(): void {
    this.receiptService
      .updateReceipt(this.originalReceipt?.id as number, this.form.value)
      .pipe(
        take(1),
        tap(() => {
          this.snackbarService.success("Successfully updated receipt");

          if (this.queueIndex === -1) {
            this.router.navigate([`/receipts/${this.originalReceipt?.id}/view`]);
          } else if (this.queueIndex >= 0 && this.queueIndex !== this.queueIds.length - 1) {
            this.queueNext();
          } else if (this.queueIndex === this.queueIds.length - 1) {
            this.snackbarService.success("Successfully updated receipt. Congratulations! You have reached the end of the queue.");
          }
        })
      )
      .subscribe();
  }
}
