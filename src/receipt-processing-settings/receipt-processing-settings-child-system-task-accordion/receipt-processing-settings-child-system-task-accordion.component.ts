import {AfterViewInit, Component, Input, TemplateRef, ViewChild} from "@angular/core";
import {SystemTask, SystemTaskType} from "../../open-api";
import {AccordionPanel} from "../../shared-ui/accordion/accordion-panel.interface";

@Component({
  selector: "app-receipt-processing-settings-child-system-task-accordion",
  templateUrl: "./receipt-processing-settings-child-system-task-accordion.component.html",
  styleUrl: "./receipt-processing-settings-child-system-task-accordion.component.scss"
})
export class ReceiptProcessingSettingsChildSystemTaskAccordionComponent implements AfterViewInit {
  @Input() public childTasks: SystemTask[] = [];

  @ViewChild("ocrProcessingDetails") public ocrProcessingDetails!: TemplateRef<any>;

  @ViewChild("chatCompletionDetails") public chatCompletionDetails!: TemplateRef<any>;


  protected readonly SystemTaskType = SystemTaskType;

  public accordionPanels: AccordionPanel[] = [];

  public ngAfterViewInit(): void {
    this.setAccordionPanels();
  }

  private setAccordionPanels(): void {
    this.childTasks.forEach(task => {
      if (task.type === SystemTaskType.OcrProcessing) {
        this.accordionPanels.push({
          title: "Raw OCR Processing Details",
          content: this.ocrProcessingDetails,
        });
      }

      if (task.type === SystemTaskType.ChatCompletion) {
        this.accordionPanels.push({
          title: "Raw Chat Completion Details",
          content: this.chatCompletionDetails,
        });
      }
    })
  }
}
