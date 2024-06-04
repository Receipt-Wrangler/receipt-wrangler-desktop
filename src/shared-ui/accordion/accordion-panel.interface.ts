import { TemplateRef } from "@angular/core";

export interface AccordionPanel {
  title: string;
  description?: string;
  content: TemplateRef<any>;
}
