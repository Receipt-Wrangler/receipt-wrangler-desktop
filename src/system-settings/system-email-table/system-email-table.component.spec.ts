import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";
import { SystemEmailTableState } from "../../store/system-email-table.state";
import { TableModule } from "../../table/table.module";

import { SystemEmailTableComponent } from "./system-email-table.component";

describe("SystemEmailsComponent", () => {
  let component: SystemEmailTableComponent;
  let fixture: ComponentFixture<SystemEmailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemEmailTableComponent],
      imports: [SharedUiModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([SystemEmailTableState]),
        TableModule,
        NoopAnimationsModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: {}
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SystemEmailTableComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
