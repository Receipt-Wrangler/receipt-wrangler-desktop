import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { TabConfig } from "src/shared-ui/tabs/tab-config.interface";
import { FeatureConfigState } from "../../store";

@Component({
  selector: "app-group-tabs",
  templateUrl: "./group-tabs.component.html",
  styleUrls: ["./group-tabs.component.scss"],
})
export class GroupTabsComponent {
  public tabs: TabConfig[] = [];

  public activeLInk: string = "";

  public ngOnInit(): void {
    this.initTabs();
  }

  constructor(private store: Store) {}

  private initTabs(): void {
    this.tabs = [
      {
        label: "Group Details",
        routerLink: "details/view",
        name: "details",
      },
    ];

    const hasAiPoweredReceipts = this.store.selectSnapshot(
      FeatureConfigState.hasFeature("aiPoweredReceipts")
    );
    if (hasAiPoweredReceipts) {
      this.tabs.push({
        label: "Group Settings",
        routerLink: "settings/view",
        name: "settings",
      });
    }
  }
}
