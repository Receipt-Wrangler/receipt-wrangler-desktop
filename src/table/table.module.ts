import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, MatTableModule, MatSortModule],
  exports: [TableComponent],
})
export class TableModule {}
