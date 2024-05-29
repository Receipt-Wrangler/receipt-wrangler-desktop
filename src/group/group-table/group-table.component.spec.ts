import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { SharedUiModule } from "src/shared-ui/shared-ui.module";
import { TableModule } from "src/table/table.module";
import { ButtonModule } from "../../button";
import { ApiModule } from "../../open-api";

import { GroupTableComponent } from "./group-table.component";

describe("GroupTableComponent", () => {
  let component: GroupTableComponent;
  let fixture: ComponentFixture<GroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupTableComponent],
      imports: [
        ApiModule,
        ButtonModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        NgxsModule.forRoot([]),
        RouterTestingModule,
        SharedUiModule,
        TableModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupTableComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
