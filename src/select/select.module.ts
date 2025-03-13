import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { OptionDisplayPipe } from "./pipes/option-display.pipe";
import { ReadonlyValuePipe } from "./pipes/readonly-value.pipe";
import { SelectComponent } from "./select/select.component";

@NgModule({
  declarations: [SelectComponent, OptionDisplayPipe, ReadonlyValuePipe],
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule, MatInput],
  exports: [SelectComponent],
  providers: [OptionDisplayPipe]
})
export class SelectModule {}
