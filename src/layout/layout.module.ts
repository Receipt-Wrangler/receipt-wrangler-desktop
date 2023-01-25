import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '../avatar';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    AvatarModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    RouterModule,
  ],
  exports: [HeaderComponent],
})
export class LayoutModule {}
