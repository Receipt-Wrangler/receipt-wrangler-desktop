import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngxs/store";
import { tap } from "rxjs";
import { TableComponent } from "src/table/table/table.component";
import { DEFAULT_DIALOG_CONFIG, DEFAULT_HOST_CLASS } from "../../constants";
import { ApiKeyView, AssociatedApiKeys, UserRole } from "../../open-api";
import { BaseTableService } from "../../services/base-table.service";
import { BaseTableComponent } from "../../shared-ui/base-table/base-table.component";
import { AuthState } from "../../store";
import { ApiKeyTableState } from "../../store/api-key-table.state";
import { ApiKeyTableFilterComponent } from "../api-key-table-filter/api-key-table-filter.component";
import { ApiKeyTableService } from "./api-key-table.service";


@UntilDestroy()
@Component({
  selector: "app-api-key-table",
  templateUrl: "./api-key-table.component.html",
  styleUrls: ["./api-key-table.component.scss"],
  host: DEFAULT_HOST_CLASS,
  providers: [
    {
      provide: BaseTableService,
      useClass: ApiKeyTableService
    }
  ],
  standalone: false
})
export class ApiKeyTableComponent extends BaseTableComponent<ApiKeyView> implements OnInit, AfterViewInit {
  @ViewChild("nameCell") private nameCell!: TemplateRef<any>;

  @ViewChild("descriptionCell") private descriptionCell!: TemplateRef<any>;

  @ViewChild("createdByCell") private createdByCell!: TemplateRef<any>;

  @ViewChild("createdAtCell") private createdAtCell!: TemplateRef<any>;

  @ViewChild("lastUsedAtCell") private lastUsedAtCell!: TemplateRef<any>;

  @ViewChild("revokedAtCell") private revokedAtCell!: TemplateRef<any>;

  @ViewChild("actionsCell") private actionsCell!: TemplateRef<any>;

  @ViewChild(TableComponent) private table!: TableComponent;

  public isAdmin = false;

  public tableHeaderText = "My API Keys";

  constructor(
    public override baseTableService: BaseTableService,
    private store: Store,
    private matDialog: MatDialog
  ) {
    super(baseTableService);
  }

  public ngOnInit(): void {
    this.isAdmin = this.store.selectSnapshot(AuthState.hasRole(UserRole.Admin));
    this.listenForFilterChanges();
  }

  public ngAfterViewInit(): void {
    this.initTable();
  }

  private listenForFilterChanges(): void {
    this.store.select(ApiKeyTableState.filter)
      .pipe(
        untilDestroyed(this),
        tap((filter) => {
            this.getTableData();
            if (filter.associatedApiKeys === AssociatedApiKeys.All) {
              this.tableHeaderText = "All API Keys";
            } else {
              this.tableHeaderText = "My API Keys";
            }
          }
        )
      )
      .subscribe();
  }

  private initTable(): void {
    this.setColumns();
  }

  private setColumns(): void {
    this.columns = [
      {
        columnHeader: "Name",
        matColumnDef: "name",
        template: this.nameCell,
        sortable: true,
      },
      {
        columnHeader: "Description",
        matColumnDef: "description",
        template: this.descriptionCell,
        sortable: true,
      },
      {
        columnHeader: "Created By",
        matColumnDef: "created_by_string",
        template: this.createdByCell,
        sortable: true,
      },
      {
        columnHeader: "Created At",
        matColumnDef: "created_at",
        template: this.createdAtCell,
        sortable: true,
      },
      {
        columnHeader: "Last Used At",
        matColumnDef: "last_used_at",
        template: this.lastUsedAtCell,
        sortable: true,
      },
      {
        columnHeader: "Revoked At",
        matColumnDef: "revoked_at",
        template: this.revokedAtCell,
        sortable: true,
      },
      {
        columnHeader: "Actions",
        matColumnDef: "actions",
        template: this.actionsCell,
        sortable: false,
      },
    ];
    this.displayedColumns = [
      "name",
      "description",
      "created_by_string",
      "created_at",
      "last_used_at",
      "revoked_at",
      "actions",
    ];
  }

  public openFilterDialog(): void {
    const ref = this.matDialog.open(ApiKeyTableFilterComponent, DEFAULT_DIALOG_CONFIG);
  }
}
