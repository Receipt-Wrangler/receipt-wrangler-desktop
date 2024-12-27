import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { PipesModule } from "../../pipes/index";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";

import { GroupReceiptSettingsComponent } from "./group-receipt-settings.component";

describe("GroupReceiptSettingsComponent", () => {
  let component: GroupReceiptSettingsComponent;
  let fixture: ComponentFixture<GroupReceiptSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupReceiptSettingsComponent],
      imports: [SharedUiModule, NgxsModule.forRoot([]), HttpClientTestingModule, PipesModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                formConfig: {},
                group: {
                  groupReceiptSettings: {}
                }
              }
            }
          },
        }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupReceiptSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
