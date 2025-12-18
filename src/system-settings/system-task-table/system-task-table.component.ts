import { Component } from "@angular/core";
import { BaseTableService } from "../../services/base-table.service";
import { SystemTaskTableService } from "../../services/system-task-table.service";

@Component({
    selector: "app-system-task-table",
    templateUrl: "./system-task-table.component.html",
    styleUrl: "./system-task-table.component.scss",
    providers: [
        {
            provide: BaseTableService,
            useClass: SystemTaskTableService
        }
    ],
    standalone: false
})
export class SystemTaskTableComponent {
}
