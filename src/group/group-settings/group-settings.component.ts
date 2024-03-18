import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Select } from "@ngxs/store";
import { Observable, take, tap } from "rxjs";
import { BaseFormComponent } from "src/form/base-form/base-form.component";
import { Group, GroupsService } from "../../open-api";
import { SnackbarService } from "../../services";
import { GroupState } from "../../store";

@Component({
  selector: "app-group-settings",
  templateUrl: "./group-settings.component.html",
  styleUrls: ["./group-settings.component.scss"],
})
export class GroupSettingsComponent
  extends BaseFormComponent
  implements OnInit {
  @Select(GroupState.settingsLinkBase)
  public settingsLinkBase!: Observable<string>;

  public group!: Group;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private groupsService: GroupsService,
    private snackbarService: SnackbarService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setFormConfigFromRoute(this.activatedRoute);
    this.initForm();
    this.group = this.activatedRoute.snapshot.data["group"];
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      emailToRead: "",
      emailIntegrationEnabled: false,
      subjectLineRegexes: this.formBuilder.array([]),
      emailWhiteList: this.formBuilder.array([]),
      emailDefaultReceiptStatus: "",
      emailDefaultReceiptPaidById: "",
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.groupsService
        .updateGroupSettings(this.group.id, this.form.value)
        .pipe(
          take(1),
          tap(() => {
            this.snackbarService.success("Group settings updated");
          })
        )
        .subscribe();
    }
  }
}
