import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FormMode } from "src/enums/form-mode.enum";

@Component({
    selector: "app-form-button-bar",
    templateUrl: "./form-button-bar.component.html",
    styleUrls: ["./form-button-bar.component.scss"],
    standalone: false
})
export class FormButtonBarComponent implements OnInit, OnDestroy {
  @Input() public mode?: FormMode;

  @Input() public justifyContentEnd = true;

  public formMode = FormMode;

  ngOnInit(): void {
    // Add class to drawer content to provide spacing for fixed button bar
    const drawerContent = document.querySelector('.drawer-content');
    if (drawerContent) {
      drawerContent.classList.add('has-form-button-bar');
    }
  }

  ngOnDestroy(): void {
    // Remove class when component is destroyed
    const drawerContent = document.querySelector('.drawer-content');
    if (drawerContent) {
      drawerContent.classList.remove('has-form-button-bar');
    }
  }
}
