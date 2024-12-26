import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { take, tap } from "rxjs";
import { BaseFormComponent } from "../../form/index";
import { Group, GroupRole, GroupsService } from "../../open-api/index";
import { SnackbarService } from "../../services/index";
import { GroupUtil } from "../../utils/index";

@Component({
  selector: "app-group-receipt-settings",
  templateUrl: "./group-receipt-settings.component.html",
  styleUrl: "./group-receipt-settings.component.scss"
})
export class GroupReceiptSettingsComponent extends BaseFormComponent implements OnInit {
  public originalGroup!: Group;

  public editLink: string = "";

  public canEdit = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private groupUtil: GroupUtil,
    private groupsService: GroupsService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setFormConfigFromRoute(this.activatedRoute);
    this.setOriginalGroup();
    this.initForm();
    this.canEdit = this.groupUtil.hasGroupAccess(this.originalGroup.id, GroupRole.Owner, false, false);
  }

  private initForm(): void {
    const receiptSettings = this.originalGroup.groupReceiptSettings;
    this.form = this.formBuilder.group({
      hideImages: [receiptSettings.hideImages ?? false],
      hideReceiptCategories: [receiptSettings.hideReceiptCategories ?? false],
      hideReceiptTags: [receiptSettings.hideReceiptTags ?? false],
      hideItemCategories: [receiptSettings.hideItemCategories ?? false],
      hideItemTags: [receiptSettings.hideItemTags ?? false],
      hideComments: [receiptSettings.hideComments ?? false],
    });
  }

  private setOriginalGroup(): void {
    this.originalGroup = this.activatedRoute.snapshot.data["group"];
    this.editLink = `/groups/${this.originalGroup.id}/receipt-settings/edit`;
  }


  public submit(): void {
    if (this.form.valid) {
      this.groupsService.updateGroupReceiptSettings(this.originalGroup.id,
        this.form.value)
        .pipe(
          take(1),
          tap(() => {
            this.snackbarService.success("Receipt settings updated successfully");
            this.router.navigate(
              [`/groups/${this.originalGroup.id}/receipt-settings/view`],
              {
                queryParams: {
                  tab: "receipt-settings"
                }
              }
            );
          })
        )
        .subscribe();
    }
  }
}
