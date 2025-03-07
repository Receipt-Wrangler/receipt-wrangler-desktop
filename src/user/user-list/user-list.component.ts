import { AfterViewInit, Component, TemplateRef, ViewChild, } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Select, Store } from "@ngxs/store";
import { Observable, take, tap } from "rxjs";
import { DEFAULT_HOST_CLASS } from "src/constants";
import { DEFAULT_DIALOG_CONFIG } from "src/constants/dialog.constant";
import { ConfirmationDialogComponent } from "src/shared-ui/confirmation-dialog/confirmation-dialog.component";
import { TableColumn } from "src/table/table-column.interface";
import { TableComponent } from "src/table/table/table.component";
import { User, UserService } from "../../open-api";
import { SnackbarService } from "../../services";
import { AuthState, RemoveUser, UserState } from "../../store";
import { DummyUserConversionDialogComponent } from "../dummy-user-conversion-dialog/dummy-user-conversion-dialog.component";
import { ResetPasswordComponent } from "../reset-password/reset-password.component";
import { UserFormComponent } from "../user-form/user-form.component";

@UntilDestroy()
@Component({
    selector: "app-user-list",
    templateUrl: "./user-list.component.html",
    styleUrls: ["./user-list.component.scss"],
    host: DEFAULT_HOST_CLASS,
    standalone: false
})
export class UserListComponent implements AfterViewInit {
  @Select(AuthState.userId) public userId!: Observable<string>;

  @ViewChild("usernameCell") public usernameCell!: TemplateRef<any>;

  @ViewChild("displayNameCell") public displaynameCell!: TemplateRef<any>;

  @ViewChild("userRoleCell") public userRoleCell!: TemplateRef<any>;

  @ViewChild("createdAtCell") public createdAtCell!: TemplateRef<any>;

  @ViewChild("updatedAtCell") public updatedAtCell!: TemplateRef<any>;

  @ViewChild("actionsCell") public actionsCell!: TemplateRef<any>;

  @ViewChild(TableComponent) public table!: TableComponent;

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(
    []
  );

  constructor(
    private matDialog: MatDialog,
    private snackbarService: SnackbarService,
    private store: Store,
    private userService: UserService
  ) {}

  public ngAfterViewInit(): void {
    this.initTable();
  }

  private initTable(): void {
    this.setColumns();
    this.setDataSource();
  }

  private setColumns(): void {
    this.columns = [
      {
        columnHeader: "Username",
        matColumnDef: "username",
        template: this.usernameCell,
        sortable: true,
      },

      {
        columnHeader: "Displayname",
        matColumnDef: "displayName",
        template: this.displaynameCell,
        sortable: true,
      },
      {
        columnHeader: "Role",
        matColumnDef: "userRole",
        template: this.userRoleCell,
        sortable: true,
      },
      {
        columnHeader: "Created At",
        matColumnDef: "createdAt",
        template: this.createdAtCell,
        sortable: true,
      },
      {
        columnHeader: "Updated At",
        matColumnDef: "updatedAt",
        template: this.updatedAtCell,
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
      "username",
      "displayName",
      "userRole",
      "createdAt",
      "updatedAt",
      "actions",
    ];
  }

  private setDataSource(): void {
    this.store
      .select(UserState.users)
      .pipe(
        untilDestroyed(this),
        tap(() => {
          this.dataSource = new MatTableDataSource<User>(
            this.store.selectSnapshot(UserState.users)
          );
          this.dataSource.sort = this.table.sort;
        })
      )
      .subscribe();
  }

  public openUserFormDialog(user?: User): void {
    const dialogRef = this.matDialog.open(
      UserFormComponent,
      DEFAULT_DIALOG_CONFIG
    );

    dialogRef.componentInstance.user = user;

    dialogRef.afterClosed().subscribe((refresh) => {
      if (refresh) {
        this.dataSource.data = this.store.selectSnapshot(UserState.users);
      }
    });
  }

  public openResetPasswordDialog(user: User): void {
    const dialogRef = this.matDialog.open(
      ResetPasswordComponent,
      DEFAULT_DIALOG_CONFIG
    );

    dialogRef.componentInstance.user = user;
  }

  public openDummyUserConversionDialog(user: User): void {
    const dialogRef = this.matDialog.open(
      DummyUserConversionDialogComponent,
      DEFAULT_DIALOG_CONFIG
    );

    dialogRef.componentInstance.user = user;
  }

  public deleteUser(index: number) {
    const users = this.store.selectSnapshot(UserState.users);
    const userId = this.store.selectSnapshot(AuthState.userId);
    const user = users[index];

    if (users[index].id.toString() !== userId) {
      const dialogRef = this.matDialog.open(
        ConfirmationDialogComponent,
        DEFAULT_DIALOG_CONFIG
      );

      dialogRef.componentInstance.headerText = "Delete User";
      dialogRef.componentInstance.dialogContent = `Are you sure you would like to delete the user '${user.username}'? This will remove the user from the user from groups, the user's receipt items, groups where this user is the only member, and receipts where the user paid. This action is irreversible.`;

      dialogRef.afterClosed().subscribe((r) => {
        if (r) {
          this.userService
            .deleteUserById(user.id)
            .pipe(
              take(1),
              tap(() => {
                this.snackbarService.success("User successfully deleted");
                this.store.dispatch(new RemoveUser(user.id.toString()));
                this.dataSource.data = this.store.selectSnapshot(
                  UserState.users
                );
              })
            )
            .subscribe();
        }
      });
    }
  }
}
