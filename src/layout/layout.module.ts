import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, MatTooltipModule],
  exports: [HeaderComponent],
})
export class LayoutModule {}
