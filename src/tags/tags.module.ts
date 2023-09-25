import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsListComponent } from './categories-list/tags-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'src/table/table.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { TagsRoutingModule } from './tags-routing.module';

@NgModule({
  declarations: [TagsListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    SharedUiModule,
    TagsRoutingModule,
  ],
})
export class TagsModule {}
