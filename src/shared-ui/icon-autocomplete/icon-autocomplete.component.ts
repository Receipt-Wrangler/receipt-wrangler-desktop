import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-icon-autocomplete",
  templateUrl: "./icon-autocomplete.component.html",
  styleUrl: "./icon-autocomplete.component.scss"
})
export class IconAutocompleteComponent {
  @Input() public inputFormControl!: FormControl;

  @Input() public label = "";

  public displayWith(value: string): string {
    return "";
    //return this.icons.find((icon) => icon.value === value)?.displayValue ?? "";
  }
}
