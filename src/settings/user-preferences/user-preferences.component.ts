import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { take, tap } from "rxjs";
import { FormMode } from "src/enums/form-mode.enum";
import { FormConfig } from "src/interfaces";
import { UserPreferencesService, UserShortcut } from "../../open-api";
import { SnackbarService } from "../../services";
import { AuthState, SetUserPreferences } from "../../store";

@Component({
  selector: "app-user-preferences",
  templateUrl: "./user-preferences.component.html",
  styleUrls: ["./user-preferences.component.scss"],
})
export class UserPreferencesComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  public formConfig!: FormConfig;

  public formMode = FormMode;

  public isAddingShortcut = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private snackbarService: SnackbarService,
    private userPreferencesService: UserPreferencesService,
    private router: Router
  ) {
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
      icon: userShortcut?.icon ?? "",
      url: userShortcut?.url ?? ""
    });
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
}
