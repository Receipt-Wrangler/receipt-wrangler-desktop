import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { BaseInputComponent } from "../../base-input";
import { SystemSettingsState } from "../../store/system-settings.state";
import { InputInterface } from "../input.interface";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent
  extends BaseInputComponent
  implements InputInterface, OnChanges {
  @ViewChild("nativeInput") public nativeInput!: { nativeElement: HTMLElement };

  @Select(SystemSettingsState.currencyDisplay) public currencyDisplay!: Observable<string>;

  @Input() public inputId: string = "";

  @Input() public type: string = "text";

  @Input() public showVisibilityEye = false;

  @Input() public isCurrency: boolean = false;

  @Input() public mask: string = "";

  @Input() public maskPrefix: string = "";

  @Input() public thousandSeparator: string = "";

  @Output() public inputBlur: EventEmitter<any> = new EventEmitter<any>(
    undefined
  );

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["isCurrency"]?.currentValue) {
      this.mask = "separator.2";
      this.thousandSeparator = ",";
    }

    if (changes["showVisibilityEye"]?.firstChange && changes["showVisibilityEye"]?.currentValue) {
      this.type = "password";
    }
  }

  public toggleVisibility(): void {
    if (this.type !== "password") {
      this.type = "password";
    } else {
      this.type = "text";
    }
  }

  // TODO: Figure this out as apart of validation issues
  // private getMinValue(): string {
  //   const err = this.inputFormControl.errors as any;
  //   return err['min']['min'] ?? '0';
  // }
}
