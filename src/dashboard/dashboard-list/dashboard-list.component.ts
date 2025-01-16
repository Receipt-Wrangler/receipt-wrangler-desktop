import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-dashboard-list",
  templateUrl: "./dashboard-list.component.html",
  styleUrl: "./dashboard-list.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class DashboardListComponent {
  @ViewChild(CdkVirtualScrollViewport) public cdkVirtualScrollViewport!: CdkVirtualScrollViewport;

  @Input() public itemHeaderTemplate!: TemplateRef<any>;

  @Input() public itemLineTemplate!: TemplateRef<any>;

  @Input() public items: any[] = [];

  @Input() public noItemFoundText = "";

  @Input() public buildRouterLinkString: (item: any) => string = (item: any) => "";
}
