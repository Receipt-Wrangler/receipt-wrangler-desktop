import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AssociatedEntityType, Prompt, ReceiptProcessingSettings } from "../../open-api";
import { TABLE_SERVICE_INJECTION_TOKEN } from "../../services/injection-tokens/table-service";
import { SystemTaskTableService } from "../../services/system-task-table.service";

@Component({
  selector: "app-system-task-table",
  templateUrl: "./system-task-table.component.html",
  styleUrl: "./system-task-table.component.scss",
  providers: [
    {
      provide: TABLE_SERVICE_INJECTION_TOKEN,
      useClass: SystemTaskTableService
    },
  ],
  standalone: false
})
export class SystemTaskTableComponent implements OnInit {
  @ViewChild("expandedRowTemplate") public expandedRowTemplate!: TemplateRef<any>;

  public prompts: Prompt[] = [];
  public allReceiptProcessingSettings: ReceiptProcessingSettings[] = [];
  protected readonly AssociatedEntityType = AssociatedEntityType;

  constructor(private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.prompts = this.activatedRoute.snapshot.data["prompts"] || [];
    this.allReceiptProcessingSettings = this.activatedRoute.snapshot.data["allReceiptProcessingSettings"] || [];
  }
}
