import { Component } from "@angular/core";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";
import { TabConfig } from "../../shared-ui/tabs/tab-config.interface";

@Component({
  selector: "app-system-settings",
  standalone: true,
  imports: [
    SharedUiModule
  ],
  templateUrl: "./system-settings.component.html",
  styleUrl: "./system-settings.component.scss"
})
export class SystemSettingsComponent {
  public tabs: TabConfig[] = [];

  public ngOnInit(): void {
    this.initTabs();
  }

  private initTabs(): void {
    this.tabs = [
      {
        label: "System Emails",
        routerLink: "system-emails/view",
      },
    ];
  }
}
