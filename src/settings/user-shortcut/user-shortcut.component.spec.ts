import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormGroup } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { InputModule } from "../../input/index";
import { PipesModule } from "../../pipes/index";
import { EditableListComponent } from "../../shared-ui/editable-list/editable-list.component";
import { IconAutocompleteComponent } from "../../shared-ui/icon-autocomplete/icon-autocomplete.component";

import { UserShortcutComponent } from "./user-shortcut.component";

describe("UserShortcutComponent", () => {
  let component: UserShortcutComponent;
  let fixture: ComponentFixture<UserShortcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserShortcutComponent, EditableListComponent, IconAutocompleteComponent],
      imports: [MatIconModule, InputModule, PipesModule, MatListModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserShortcutComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({});
    component.formConfig = {} as any;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
