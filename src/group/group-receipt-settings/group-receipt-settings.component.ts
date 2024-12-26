import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { BaseFormComponent } from "../../form/index";
import { Group, GroupRole } from "../../open-api/index";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";
import { GroupUtil } from "../../utils/index";

@Component({
  selector: "app-group-receipt-settings",
  standalone: true,
  imports: [
    SharedUiModule
  ],
  templateUrl: "./group-receipt-settings.component.html",
  styleUrl: "./group-receipt-settings.component.scss"
})
export class GroupReceiptSettingsComponent extends BaseFormComponent implements OnInit {
  public originalGroup!: Group;

  public editLink: string = "";

  public canEdit = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private groupUtil: GroupUtil
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setFormConfigFromRoute(this.activatedRoute);
    this.setOriginalGroup();
    this.canEdit = this.groupUtil.hasGroupAccess(this.originalGroup.id, GroupRole.Owner, false, false);
  }

  private setOriginalGroup(): void {
    this.originalGroup = this.activatedRoute.snapshot.data["group"];
    this.editLink = `/groups/${this.originalGroup.id}/receipt-settings/edit`;
  }


  public submit(): void {}
}
