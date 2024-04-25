import { Component, OnInit } from "@angular/core";
import { TabConfig } from "../../shared-ui/tabs/tab-config.interface";

@Component({
  selector: "app-system-settings",
  templateUrl: "./system-settings.component.html",
  styleUrl: "./system-settings.component.scss"
})
export class SystemSettingsComponent implements OnInit {
  public tabs: TabConfig[] = [];

  public ngOnInit(): void {
    this.initTabs();
  }

  private initTabs(): void {
    this.tabs = [
      {
        label: "System Emails",
        routerLink: "system-email-table/view",
      },
    ];
  }
}
