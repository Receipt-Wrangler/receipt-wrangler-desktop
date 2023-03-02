import { TemplateRef } from '@angular/core';

export interface TableColumn {
  columnHeader: string;
  matColumnDef: string;
  sortable: boolean;
  elementKey?: string;
  template?: TemplateRef<any>;
}
