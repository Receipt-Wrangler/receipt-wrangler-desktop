import { Component, Input } from "@angular/core";

@Component({
  selector: "app-audit-detail-section",
  templateUrl: "./audit-detail-section.component.html",
  styleUrl: "./audit-detail-section.component.scss"
})
export class AuditDetailSectionComponent {
  @Input() data!: any;
}
