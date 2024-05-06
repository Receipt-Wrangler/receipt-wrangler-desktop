import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromptRoutingModule } from './prompt-routing.module';
import { PromptTableComponent } from './prompt-table/prompt-table.component';


@NgModule({
  declarations: [
    PromptTableComponent
  ],
  imports: [
    CommonModule,
    PromptRoutingModule
  ]
})
export class PromptModule { }
