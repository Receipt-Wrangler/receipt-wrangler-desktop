import { TemplateRef } from '@angular/core';

export interface TableColumn {
  columnHeader: string;
  matColumnDef: string;
  elementKey?: string;
  template?: TemplateRef<any>;
}
