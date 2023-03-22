import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import {
  finalize,
  forkJoin,
  iif,
  Observable,
  of,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ReceiptImagesService } from 'src/api/receipt-images.service';
import { ReceiptsService } from 'src/api/receipts.service';
import { FormMode } from 'src/enums/form-mode.enum';
import { GroupRole } from 'src/enums/group-role.enum';
import { Category, Receipt, Tag } from 'src/models';
import { FileData } from 'src/models/file-data';
import { Group } from 'src/models/group';
import { SnackbarService } from 'src/services/snackbar.service';
import { GroupState } from 'src/store/group.state';
import { UserState } from 'src/store/user.state';
import { UserAutocompleteComponent } from 'src/user-autocomplete/user-autocomplete/user-autocomplete.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { QuickActionsDialogComponent } from '../quick-actions-dialog/quick-actions-dialog.component';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { formatImageData } from '../utils/form.utils';

@UntilDestroy()
@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss'],
})
export class ReceiptFormComponent implements OnInit {
  @ViewChild(ItemListComponent) itemsListComponent!: ItemListComponent;

  @ViewChild(UploadImageComponent) uploadImageComponent!: UploadImageComponent;

  @ViewChild('paidByAutocomplete')
  paidByAutocomplete!: UserAutocompleteComponent;

  @Select(GroupState.groups) public groups!: Observable<Group[]>;

  public categories: Category[] = [];

  public tags: Tag[] = [];

  public originalReceipt?: Receipt;

  public images: FileData[] = [];

  public mode: FormMode = FormMode.view;

  public formMode = FormMode;

  public groupRole = GroupRole;

  public editLink = '';

  public cancelLink = '';

  public imagesLoading: boolean = false;

  public usersToOmit: string[] = [];

  constructor(
    private receiptsService: ReceiptsService,
    private receiptImagesService: ReceiptImagesService,
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
    this.setCancelLink();
    this.initForm();
    this.getImageFiles();
    this.mode = this.activatedRoute.snapshot.data['mode'];
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
      isResolved: this.originalReceipt?.isResolved ?? false,
    });

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
            this.paidByAutocomplete.autocompleteComponent.clearFilter();
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
        this.receiptImagesService
          .getImageFiles(file.id.toString())
          .pipe(
            tap((data) => {
              file.imageData = data;
              this.images.push(file);
            }),
            finalize(() => (this.imagesLoading = false))
          )
          .subscribe();
      });
    }
  }

  public openQuickActionsModal(): void {
    const dialogRef = this.matDialog.open(QuickActionsDialogComponent);

    dialogRef.componentInstance.parentForm = this.form;
    dialogRef.componentInstance.originalReceipt = this.originalReceipt;
    dialogRef.componentInstance.usersToOmit = this.usersToOmit;

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        if (result) {
          this.itemsListComponent.setUserItemMap();
        }
      });
  }

  public removeImage(index: number): void {
    if (this.mode === FormMode.add) {
      this.images.splice(index, 1);
    } else {
      const image = this.images[index];
      this.receiptImagesService
        .deleteImage(image.id.toString())
        .pipe(
          tap(() => {
            this.images.splice(index, 1);
            this.snackbarService.success('Image successfully removed');
          })
        )
        .subscribe();
    }
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
      this.receiptsService
        .updateReceipt(this.originalReceipt.id.toString(), this.form.value)
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
      this.receiptsService
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
                  this.receiptImagesService.uploadImage(
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
