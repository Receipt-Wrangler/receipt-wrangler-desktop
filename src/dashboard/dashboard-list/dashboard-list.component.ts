import { Component, Input, TemplateRef, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-dashboard-list",
  templateUrl: "./dashboard-list.component.html",
  styleUrl: "./dashboard-list.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class DashboardListComponent {
  @Input() public itemHeaderTemplate!: TemplateRef<any>;

  @Input() public itemLineTemplate!: TemplateRef<any>;

  @Input() public items: any[] = [];

  @Input() public noItemFoundText = "";
}
