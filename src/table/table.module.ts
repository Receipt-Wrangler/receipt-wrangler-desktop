import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  exports: [TableComponent],
})
export class TableModule {}
