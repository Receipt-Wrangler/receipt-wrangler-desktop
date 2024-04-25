import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SystemEmailTableComponent } from "./system-email-table.component";

describe("SystemEmailsComponent", () => {
  let component: SystemEmailTableComponent;
  let fixture: ComponentFixture<SystemEmailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemEmailTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SystemEmailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
