import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {AutocompleteModule} from "../autocomplete/autocomplete.module";
import {ButtonModule} from "../button";
import {CheckboxModule} from "../checkbox/checkbox.module";
import {InputModule} from "../input";
import {PipesModule} from "../pipes";
import {PromptModule} from "../prompt/prompt.module";
import {ReceiptProcessingSettingsModule} from "../receipt-processing-settings/receipt-processing-settings.module";
import {SharedUiModule} from "../shared-ui/shared-ui.module";
import {TableModule} from "../table/table.module";
import {SystemEmailFormComponent} from "./system-email-form/system-email-form.component";
import {SystemEmailTableComponent} from "./system-email-table/system-email-table.component";
import {SystemSettingsFormComponent} from "./system-settings-form/system-settings-form.component";

import {SystemSettingsRoutingModule} from "./system-settings-routing.module";
import {SystemSettingsComponent} from "./system-settings/system-settings.component";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [SystemEmailTableComponent, SystemSettingsComponent, SystemEmailFormComponent, SystemSettingsFormComponent],
  imports: [
    ButtonModule,
    CommonModule,
    InputModule,
    PipesModule,
    PromptModule,
    ReactiveFormsModule,
    ReceiptProcessingSettingsModule,
    SharedUiModule,
    SystemSettingsRoutingModule,
    TableModule,
    CheckboxModule,
    AutocompleteModule,
    MatButton,
  ]
})
export class SystemSettingsModule {
}
