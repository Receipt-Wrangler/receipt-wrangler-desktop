import { Component } from "@angular/core";
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
export class SystemTaskTableComponent {
}
