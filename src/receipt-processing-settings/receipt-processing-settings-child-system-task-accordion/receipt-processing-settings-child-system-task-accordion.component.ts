import { Component, Input } from "@angular/core";
import { SystemTask, SystemTaskType } from "../../open-api";

@Component({
  selector: "app-receipt-processing-settings-child-system-task-accordion",
  templateUrl: "./receipt-processing-settings-child-system-task-accordion.component.html",
  styleUrl: "./receipt-processing-settings-child-system-task-accordion.component.scss"
})
export class ReceiptProcessingSettingsChildSystemTaskAccordionComponent {
  @Input() public childTasks: SystemTask[] = [];

  protected readonly SystemTaskType = SystemTaskType;
}
