import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ReceiptProcessingSettings } from "../../open-api";
import { BaseTableComponent } from "../../shared-ui/base-table/base-table.component";

@Component({
  selector: "app-receipt-processing-settings-table",
  templateUrl: "./receipt-processing-settings-table.component.html",
  styleUrl: "./receipt-processing-settings-table.component.scss"
})
export class ReceiptProcessingSettingsTableComponent extends BaseTableComponent<ReceiptProcessingSettings> implements OnInit, AfterViewInit {
  public ngOnInit(): void {
    // this.getTableData();
  }

  public ngAfterViewInit(): void {
    this.initTable();
  }

  private initTable(): void {
    this.setColumns();
  }

  private setColumns(): void {

  }
}
