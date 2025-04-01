import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";

@Component({
  selector: "app-item-list",
  standalone: false,
  templateUrl: "./item-list.component.html",
  styleUrl: "./item-list.component.scss"
})
export class ItemListComponent implements OnChanges {
  @Input() public form!: FormGroup;

  public itemsFormArray?: FormArray;


  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["form"].currentValue) {
      this.itemsFormArray = this.form.get("receiptItems") as FormArray;
    }
  }
}
