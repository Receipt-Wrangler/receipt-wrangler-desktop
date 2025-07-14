import { ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren, ViewEncapsulation, } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, } from "@angular/forms";
import { MatExpansionPanel } from "@angular/material/expansion";
import { ActivatedRoute } from "@angular/router";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { RECEIPT_ITEM_STATUS_OPTIONS } from "src/constants/receipt-status-options";
import { FormMode } from "src/enums/form-mode.enum";
import { InputComponent } from "../../input";
import { Category, Group, GroupRole, Share, ShareStatus, Receipt, Tag, User } from "../../open-api";
import { UserState } from "../../store";
import { buildItemForm } from "../utils/form.utils";

export interface ShareData {
  share: Share;
  arrayIndex: number;
}

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class ItemListComponent implements OnInit {
  @ViewChildren("userExpansionPanel")
  public userExpansionPanels!: QueryList<MatExpansionPanel>;

  @ViewChildren("nameField")
  public nameFields!: QueryList<InputComponent>;

  @Select(UserState.users) public users!: Observable<User[]>;

  @Input() public form!: FormGroup;

  @Input() public originalReceipt?: Receipt;

  @Input() public categories: Category[] = [];

  @Input() public tags: Tag[] = [];

  @Input() public selectedGroup: Group | undefined;

  public newItemFormGroup: FormGroup = new FormGroup({});

  public userShareMap: Map<string, ShareData[]> = new Map<string, ShareData[]>();

  public isAdding: boolean = false;

  public mode: FormMode = FormMode.view;

  public formMode = FormMode;

  public groupRole = GroupRole;

  public itemStatusOptions = RECEIPT_ITEM_STATUS_OPTIONS;

  public get receiptShares(): FormArray {
    return this.form.get("receiptShares") as FormArray;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.originalReceipt = this.activatedRoute.snapshot.data["receipt"];
    this.mode = this.activatedRoute.snapshot.data["mode"];
    this.initForm();
    this.setUserShareMap();
  }

  private initForm(): void {
    this.form.addControl(
      "receiptShares",
      this.formBuilder.array(
        this.originalReceipt?.receiptShares
          ? this.originalReceipt.receiptShares.map((share) =>
            buildItemForm(share, this.originalReceipt?.id?.toString())
          )
          : []
      )
    );
  }

  public setUserShareMap(): void {
    const receiptShares = this.form.get("receiptShares");
    if (receiptShares) {
      const shares = this.form.get("receiptShares")?.value as Share[];
      const map = new Map<string, ShareData[]>();

      if (shares?.length > 0) {
        shares.forEach((share, index) => {
          const chargedToUserId = share.chargedToUserId.toString();
          const shareData: ShareData = {
            share: share,
            arrayIndex: index,
          };

          if (map.has(chargedToUserId)) {
            const newShares = Array.from(map.get(chargedToUserId) as ShareData[]);
            newShares.push(shareData);
            map.set(chargedToUserId, newShares);
          } else {
            map.set(chargedToUserId, [shareData]);
          }
        });
      }
      this.userShareMap = map;
    }
  }

  public initAddMode(): void {
    this.isAdding = true;
    this.newItemFormGroup = buildItemForm(
      undefined,
      this.originalReceipt?.id?.toString()
    );
  }

  public exitAddMode(): void {
    this.isAdding = false;
    this.newItemFormGroup = new FormGroup({});
  }

  public submitNewItemFormGroup(): void {
    if (this.newItemFormGroup.valid) {
      const formArray = this.form.get("receiptShares") as FormArray;
      formArray.push(this.newItemFormGroup);
      this.exitAddMode();
      this.setUserShareMap();
    }
  }

  public removeShare(shareData: ShareData): void {
    const formArray = this.form.get("receiptShares") as FormArray;
    formArray.removeAt(shareData.arrayIndex);
    this.setUserShareMap();
  }

  public addInlineShare(userId: string, event?: MouseEvent): void {
    if (event) {
      event?.stopImmediatePropagation();
    }

    if (this.mode !== FormMode.view) {
      this.receiptShares.push(
        buildItemForm(
          {
            name: "",
            chargedToUserId: Number(userId),
          } as Share,
          this.originalReceipt?.id?.toString()
        )
      );
      this.setUserShareMap();
    }
  }

  public addInlineShareOnBlur(userId: string, index: number): void {
    const userShares = this.userShareMap.get(userId);
    if (userShares && userShares.length - 1 === index) {
      const share = userShares.at(index) as ShareData;
      const shareInput = this.receiptShares.at(share?.arrayIndex);
      if (shareInput.valid) {
        const activeElement = document.activeElement as HTMLElement;
        this.addInlineShare(userId);
      }
    }
  }

  public checkLastInlineShare(userId: string): void {
    if (this.mode !== FormMode.view) {
      const shares = this.userShareMap.get(userId);
      if (shares && shares.length > 1) {
        const lastShare = shares[shares.length - 1];
        const formGroup = this.receiptShares.at(lastShare.arrayIndex);
        const nameValue = formGroup.get('name')?.value;
        const amountValue = formGroup.get('amount')?.value;
        
        if (formGroup.pristine && (!nameValue || nameValue.trim() === '') && (!amountValue || amountValue === 0)) {
          this.receiptShares.removeAt(lastShare.arrayIndex);
          this.setUserShareMap();
        }
      }
    }
  }

  public resolveAllSharesClicked(event: MouseEvent, userId: string): void {
    event.stopImmediatePropagation();
    const filtered = this.getSharesForUser(userId);

    filtered.forEach((i) =>
      i.patchValue({
        status: ShareStatus.Resolved,
      })
    );
  }

  public allUserSharesResolved(userId: string): boolean {
    const userShares = this.getSharesForUser(userId);
    return userShares.every(
      (i) => i.get("status")?.value === ShareStatus.Resolved
    );
  }

  private getSharesForUser(userId: string): AbstractControl[] {
    return this.receiptShares.controls.filter(
      (i) => i.get("chargedToUserId")?.value?.toString() === userId
    );
  }
}
