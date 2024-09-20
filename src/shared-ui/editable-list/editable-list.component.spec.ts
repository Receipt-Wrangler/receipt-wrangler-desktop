import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatListModule } from "@angular/material/list";
import { ButtonModule } from "../../button/index";

import { EditableListComponent } from "./editable-list.component";

describe("EditableListComponent", () => {
  let component: EditableListComponent;
  let fixture: ComponentFixture<EditableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditableListComponent],
      imports: [MatListModule, ButtonModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
