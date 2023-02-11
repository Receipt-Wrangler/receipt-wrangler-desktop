import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '../avatar';
import { HeaderComponent } from './header/header.component';
import { AddReceiptIconComponent } from './add-receipt-icon/add-receipt-icon.component';
import { ReceiptListIconComponent } from './receipt-list-icon/receipt-list-icon.component';
import { DashboardIconComponent } from './dashboard-icon/dashboard-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DirectivesModule } from 'src/directives/directives.module';

@NgModule({
  declarations: [
    HeaderComponent,
    AddReceiptIconComponent,
    ReceiptListIconComponent,
    DashboardIconComponent,
  ],
  imports: [
    AvatarModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    RouterModule,
    DirectivesModule,
  ],
  exports: [HeaderComponent, AddReceiptIconComponent],
})
export class LayoutModule {}
