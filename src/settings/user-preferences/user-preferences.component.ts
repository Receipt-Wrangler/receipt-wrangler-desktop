import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { take, tap } from "rxjs";
import { FormMode } from "src/enums/form-mode.enum";
import { FormConfig } from "src/interfaces";
import { UserPreferencesService, UserShortcut } from "../../open-api";
import { SnackbarService } from "../../services";
import { EditableListComponent } from "../../shared-ui/editable-list/editable-list.component";
import { AuthState, SetUserPreferences } from "../../store";

@Component({
  selector: "app-user-preferences",
  templateUrl: "./user-preferences.component.html",
  styleUrls: ["./user-preferences.component.scss"],
})
export class UserPreferencesComponent implements OnInit {
  @ViewChild(EditableListComponent) public editableListComponent!: EditableListComponent;

  public form: FormGroup = new FormGroup({});

  public formConfig!: FormConfig;

  public formMode = FormMode;

  public isAddingShortcut = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService,
    private store: Store,
    private userPreferencesService: UserPreferencesService,
  ) {
  }

  public get userShortcuts(): FormArray {
    return this.form.get("userShortcuts") as FormArray;
  }

  public ngOnInit(): void {
    this.formConfig = this.activatedRoute.snapshot.data["formConfig"];
    this.initForm();
  }

  private initForm(): void {
    const userPreferences = this.store.selectSnapshot(
      AuthState.userPreferences
    );
    this.form = this.formBuilder.group({
      showLargeImagePreviews: userPreferences?.showLargeImagePreviews ?? false,
      quickScanDefaultPaidById: userPreferences?.quickScanDefaultPaidById ?? "",
      quickScanDefaultGroupId: userPreferences?.quickScanDefaultGroupId ?? "",
      quickScanDefaultStatus: userPreferences?.quickScanDefaultStatus ?? "",
      userShortcuts: this.formBuilder.array((userPreferences?.userShortcuts ?? []).map(shortcut => this.buildUserShortcut(shortcut))),
    });

    if (this.formConfig.mode === FormMode.view) {
      this.form.get("quickScanDefaultStatus")?.disable();
      this.form.get("showLargeImagePreviews")?.disable();
    }
  }

  private buildUserShortcut(userShortcut?: UserShortcut): FormGroup {
    return this.formBuilder.group({
      trackby: (Math.random() + 1).toString(36).substring(7),
      name: this.formBuilder.control(userShortcut?.name ?? "", Validators.required),
      icon: this.formBuilder.control(userShortcut?.icon ?? "", Validators.required),
      url: this.formBuilder.control(userShortcut?.url ?? "", Validators.required),
    });
  }

  public addNewShortcut(): void {
    const userShortcuts = this.form.get("userShortcuts") as FormArray;
    userShortcuts.push(this.buildUserShortcut());
    this.editableListComponent.openLastRow();

    this.isAddingShortcut = true;
  }

  public shortcutDoneClicked(): void {
    if (this.userShortcuts.at(this.userShortcuts.length - 1).valid) {
      this.isAddingShortcut = false;
      this.editableListComponent.closeRow();
    }
  }

  public shortcutCancelClicked(): void {
    if (this.isAddingShortcut) {
      this.userShortcuts.removeAt(this.userShortcuts.length - 1);
    }

    this.isAddingShortcut = false;
    this.editableListComponent.closeRow();
  }

  public submit(): void {
    if (this.form.valid) {
      const result = this.form.value;
      if (result.quickScanDefaultPaidById === "") {
        result.quickScanDefaultPaidById = null;
      }

      if (result.quickScanDefaultGroupId === "") {
        result.quickScanDefaultGroupId = null;
      }

      this.userPreferencesService
        .updateUserPreferences(result)
        .pipe(
          take(1),
          tap((updatedUserPreferences) => {
            this.snackbarService.success(
              "User preferences successfully updated"
            );
            this.store.dispatch(new SetUserPreferences(updatedUserPreferences));
            this.router.navigate(["/settings/user-preferences/view"],
              {
                queryParams: {
                  tab: "user-preferences",
                }
              });
          })
        )
        .subscribe();
    }
  }

  protected readonly FormMode = FormMode;
  protected readonly length = length;
}
