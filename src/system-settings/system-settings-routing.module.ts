import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormMode } from "../enums/form-mode.enum";
import { FormConfig } from "../interfaces";
import { PromptFormComponent } from "../prompt/prompt-form/prompt-form.component";
import { PromptTableComponent } from "../prompt/prompt-table/prompt-table.component";
import { promptResolver } from "../prompt/prompt.resolver";
import { promptsResolver } from "../prompt/prompts.resolver";
import {
  ReceiptProcessingSettingsFormComponent
} from "../receipt-processing-settings/receipt-processing-settings-form/receipt-processing-settings-form.component";
import {
  ReceiptProcessingSettingsTableComponent
} from "../receipt-processing-settings/receipt-processing-settings-table/receipt-processing-settings-table.component";
import { systemEmailResolver } from "./resolvers/system-email.resolver";
import { SystemEmailFormComponent } from "./system-email-form/system-email-form.component";
import { SystemEmailTableComponent } from "./system-email-table/system-email-table.component";
import { SystemSettingsComponent } from "./system-settings/system-settings.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "system-emails",
    pathMatch: "full",
  },
  {
    path: "",
    component: SystemSettingsComponent,
    children: [
      {
        path: "system-emails",
        component: SystemEmailTableComponent,
      },
      {
        path: "prompts",
        component: PromptTableComponent,
      },
      {
        path: "receipt-processing-settings",
        component: ReceiptProcessingSettingsTableComponent
      }
    ]
  },
  {
    path: "prompts/create",
    component: PromptFormComponent,
    data: {
      formConfig: {
        mode: FormMode.add,
        headerText: "Create Prompt",
      } as FormConfig,
    },
  },
  {
    path: "prompts/:id/view",
    component: PromptFormComponent,
    data: {
      formConfig: {
        mode: FormMode.view,
        headerText: "View Prompt",
      } as FormConfig,
    },
    resolve: {
      prompt: promptResolver
    }
  },
  {
    path: "prompts/:id/edit",
    component: PromptFormComponent,
    data: {
      formConfig: {
        mode: FormMode.edit,
        headerText: "Edit Prompt",
      } as FormConfig,
    },
    resolve: {
      prompt: promptResolver
    }
  },
  {
    path: "system-emails/create",
    component: SystemEmailFormComponent,
    data: {
      formConfig: {
        mode: FormMode.add,
        headerText: "Create System Email",
      } as FormConfig,
    }
  },
  {
    path: "system-emails/:id/view",
    component: SystemEmailFormComponent,
    data: {
      formConfig: {
        mode: FormMode.view,
        headerText: "View System Email",
      } as FormConfig,
    },
    resolve: {
      systemEmail: systemEmailResolver,
    }
  },
  {
    path: "system-emails/:id/edit",
    component: SystemEmailFormComponent,
    data: {
      formConfig: {
        mode: FormMode.edit,
        headerText: "Edit System Email",
      } as FormConfig,
    },
    resolve: {
      systemEmail: systemEmailResolver,
    }
  },
  {
    path: "receipt-processing-settings/create",
    component: ReceiptProcessingSettingsFormComponent,
    data: {
      formConfig: {
        mode: FormMode.add,
        headerText: "Create Receipt Processing Settings",
      } as FormConfig,
    },
    resolve: {
      prompts: promptsResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingsRoutingModule {}
