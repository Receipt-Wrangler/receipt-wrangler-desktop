import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { NgxsModule } from "@ngxs/store";
import { DirectivesModule } from "../../directives";
import { PipesModule } from "../../pipes";

import { QuickScanButtonComponent } from "./quick-scan-button.component";

describe("QuickScanButtonComponent", () => {
  let component: QuickScanButtonComponent;
  let fixture: ComponentFixture<QuickScanButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickScanButtonComponent],
      imports: [MatDialogModule, PipesModule, DirectivesModule, NgxsModule.forRoot([])],
      providers: []
    });
    fixture = TestBed.createComponent(QuickScanButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
