import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { FormMode } from "../../enums/form-mode.enum";
import { GroupsService } from "../../open-api";
import { PipesModule } from "../../pipes/index";
import { SnackbarService } from "../../services";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";
import { GroupUtil } from "../../utils";
import { GroupReceiptSettingsComponent } from "./group-receipt-settings.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("GroupReceiptSettingsComponent", () => {
  let component: GroupReceiptSettingsComponent;
  let fixture: ComponentFixture<GroupReceiptSettingsComponent>;
  let httpTestingController: HttpTestingController;

  const testGroup = {
    id: 1,
    groupReceiptSettings: {
      hideImages: true,
      hideReceiptCategories: false,
      hideReceiptTags: true,
      hideItemCategories: false,
      hideItemTags: true,
      hideComments: false
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [GroupReceiptSettingsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [SharedUiModule,
        NgxsModule.forRoot([]),
        PipesModule],
    providers: [
        FormBuilder,
        GroupsService,
        Router,
        Store,
        SnackbarService,
        GroupUtil,
        {
            provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    data: {
                        formConfig: { mode: FormMode.edit },
                        group: testGroup
                    }
                }
            }
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(GroupReceiptSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize form with group receipt settings", () => {
    expect(component.form.getRawValue()).toEqual(testGroup.groupReceiptSettings);
    expect(component.editLink).toBe(`/groups/${testGroup.id}/receipt-settings/edit`);
  });

  it("should disable form in view mode", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
    declarations: [GroupReceiptSettingsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [SharedUiModule, NgxsModule.forRoot([]), PipesModule],
    providers: [
        FormBuilder,
        GroupsService,
        Router,
        Store,
        SnackbarService,
        GroupUtil,
        {
            provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    data: {
                        formConfig: { mode: FormMode.view },
                        group: testGroup
                    }
                }
            }
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}).compileComponents();

    fixture = TestBed.createComponent(GroupReceiptSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.form.disabled).toBeTrue();
  });

  it("should submit form and update settings", () => {
    const groupsService = TestBed.inject(GroupsService);
    const store = TestBed.inject(Store);
    const router = TestBed.inject(Router);
    const snackbarService = TestBed.inject(SnackbarService);

    spyOn(groupsService, "updateGroupReceiptSettings").and.returnValue(of(testGroup.groupReceiptSettings as any));
    spyOn(store, "dispatch").and.returnValue(of({}));
    spyOn(router, "navigate");
    spyOn(snackbarService, "success");

    component.form.patchValue(testGroup.groupReceiptSettings);
    component.submit();

    expect(groupsService.updateGroupReceiptSettings).toHaveBeenCalledWith(
      testGroup.id,
      testGroup.groupReceiptSettings
    );
    expect(store.dispatch).toHaveBeenCalled();
    expect(snackbarService.success).toHaveBeenCalledWith("Receipt settings updated successfully");
    expect(router.navigate).toHaveBeenCalledWith(
      [`/groups/${testGroup.id}/receipt-settings/view`],
      { queryParams: { tab: "receipt-settings" } }
    );
  });
});
