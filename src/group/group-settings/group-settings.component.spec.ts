import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { ApiModule } from "../../open-api";
import { GroupSettingsComponent } from "./group-settings.component";

describe("GroupSettingsComponent", () => {
  let component: GroupSettingsComponent;
  let fixture: ComponentFixture<GroupSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupSettingsComponent],
      imports: [
        ApiModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([]),
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                formConfig: {},
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(GroupSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init form with empty values", () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      emailToRead: "",
      emailIntegrationEnabled: false,
      subjectLineRegexes: [],
      emailWhiteList: [],
      emailDefaultReceiptStatus: "",
      emailDefaultReceiptPaidById: "",
    });
  });
});
