import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SelectComponent } from "./select/select.component";

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule, MatInput],
  exports: [SelectComponent],
})
export class SelectModule {}
