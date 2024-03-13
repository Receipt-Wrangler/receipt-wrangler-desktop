import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { InputReadonlyPipe } from "src/pipes/input-readonly.pipe";
import { SharedUiModule } from "src/shared-ui/shared-ui.module";
import { UserPreferences, UserPreferencesService } from "../../api";
import { PipesModule } from "../../pipes";
import { AuthState } from "../../store";

import { UserPreferencesComponent } from "./user-preferences.component";

describe("UserPreferencesComponent", () => {
  let component: UserPreferencesComponent;
  let fixture: ComponentFixture<UserPreferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPreferencesComponent, InputReadonlyPipe],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([AuthState]),
        MatSnackBarModule,
        PipesModule,
        SharedUiModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        UserPreferencesService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { formConfig: {} } } },
        },
      ],
    });
    fixture = TestBed.createComponent(UserPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init form correctly without data", () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      quickScanDefaultPaidById: "",
      quickScanDefaultGroupId: "",
      quickScanDefaultStatus: "",
    });
  });

  it("should init form with user preference data", () => {
    const store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      auth: {
        ...store.snapshot().auth,
        userPreferences: {
          quickScanDefaultPaidById: "1",
          quickScanDefaultGroupId: "2",
          quickScanDefaultStatus: "OPEN",
        },
      },
    });
    component.ngOnInit();

    expect(component.form.value).toEqual({
      quickScanDefaultPaidById: "1",
      quickScanDefaultGroupId: "2",
      quickScanDefaultStatus: "OPEN",
    });
  });

  it("should attempt to call update endpoint", () => {
    const userPreference: UserPreferences = {
      quickScanDefaultPaidById: 1,
      quickScanDefaultGroupId: 2,
      quickScanDefaultStatus: "OPEN",
    } as UserPreferences;
    const serviceSpy = spyOn(
      TestBed.inject(UserPreferencesService),
      "updateUserPreferences"
    ).and.returnValue(of(userPreference) as any);
    const storeSpy = spyOn(TestBed.inject(Store), "dispatch");

    component.ngOnInit();
    component.form.patchValue(userPreference);
    component.submit();

    expect(serviceSpy).toHaveBeenCalledWith(component.form.value);
    // TODO: Get this call covered expect(storeSpy).toHaveBeenCalled();
  });

  it("should attempt to call update endpoint with nulls", () => {
    const serviceSpy = spyOn(
      TestBed.inject(UserPreferencesService),
      "updateUserPreferences"
    ).and.returnValue(of(undefined as any));

    component.ngOnInit();
    component.submit();

    expect(serviceSpy).toHaveBeenCalledWith({
      quickScanDefaultPaidById: null,
      quickScanDefaultGroupId: null,
      quickScanDefaultStatus: "",
    } as any);
  });
});
