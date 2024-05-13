import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Store } from "@ngxs/store";
import { ReceiptProcessingSettings } from "../../open-api";
import { BaseTableService } from "../../services/base-table.service";
import { BaseTableComponent } from "../../shared-ui/base-table/base-table.component";
import { ReceiptProcessingSettingsTableState } from "../../store/receipt-processing-settings-table.state";
import { TableColumn } from "../../table/table-column.interface";
import { ReceiptProcessingSettingsTableService } from "./receipt-processing-settings-table.service";

@Component({
  selector: "app-receipt-processing-settings-table",
  templateUrl: "./receipt-processing-settings-table.component.html",
  styleUrl: "./receipt-processing-settings-table.component.scss",
  providers: [
    {
      provide: BaseTableService,
      useClass: ReceiptProcessingSettingsTableService
    }
  ]
})
export class ReceiptProcessingSettingsTableComponent extends BaseTableComponent<ReceiptProcessingSettings> implements OnInit, AfterViewInit {
  @ViewChild("nameCell") public nameCell!: TemplateRef<any>;

  @ViewChild("descriptionCell") public descriptionCell!: TemplateRef<any>;

  @ViewChild("aiTypeCell") public aiTypeCell!: TemplateRef<any>;

  @ViewChild("ocrEngineCell") public ocrEngineCell!: TemplateRef<any>;

  @ViewChild("createdAtCell") public createdAtCell!: TemplateRef<any>;

  @ViewChild("updatedAtCell") public updatedAtCell!: TemplateRef<any>;

  constructor(public override baseTableService: BaseTableService, private store: Store) {
    super(baseTableService);
  }

  public ngOnInit(): void {
    this.getTableData();
  }

  public ngAfterViewInit(): void {
    this.initTable();
  }

  private initTable(): void {
    this.setColumns();
  }

  private setColumns(): void {
    const columns: TableColumn[] = [
      {
        columnHeader: "Name",
        matColumnDef: "name",
        template: this.nameCell,
        sortable: true
      },
      {
        columnHeader: "Description",
        matColumnDef: "description",
        template: this.descriptionCell,
        sortable: true
      },
      {
        columnHeader: "AI Type",
        matColumnDef: "ai_type",
        template: this.aiTypeCell,
        sortable: true
      },
      {
        columnHeader: "OCR Engine",
        matColumnDef: "ocr_engine",
        template: this.ocrEngineCell,
        sortable: true
      },
      {
        columnHeader: "Created At",
        matColumnDef: "created_at",
        template: this.createdAtCell,
        sortable: true
      },
      {
        columnHeader: "Updated At",
        matColumnDef: "updated_at",
        template: this.updatedAtCell,
        sortable: true
      }
    ] as TableColumn[];
    this.setInitialSortedColumn(this.store.selectSnapshot(ReceiptProcessingSettingsTableState.state), columns);

    this.columns = columns;
    this.displayedColumns = columns.map((c) => c.matColumnDef);
  }
}
