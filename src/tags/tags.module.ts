import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsListComponent } from './categories-list/tags-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'src/table/table.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { TagsRoutingModule } from './tags-routing.module';
import { TagFormComponent } from './tag-form/tag-form.component';
import {
  DirectivesModule,
  InputModule,
  PipesModule,
} from '@receipt-wrangler/receipt-wrangler-core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TagsListComponent, TagFormComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    HttpClientModule,
    InputModule,
    PipesModule,
    ReactiveFormsModule,
    SharedUiModule,
    TableModule,
    TagsRoutingModule,
  ],
})
export class TagsModule {}
