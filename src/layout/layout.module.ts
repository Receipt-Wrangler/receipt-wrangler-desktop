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
import { SwitchGroupDialogComponent } from './switch-group-dialog/switch-group-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AutocompleteModule } from 'src/autocomplete/autocomplete.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/pipes/pipes.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AddReceiptIconComponent,
    ReceiptListIconComponent,
    DashboardIconComponent,
    SwitchGroupDialogComponent,
    SidebarComponent,
  ],
  imports: [
    AutocompleteModule,
    AvatarModule,
    CommonModule,
    DirectivesModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    SharedUiModule,
  ],
  exports: [HeaderComponent, AddReceiptIconComponent],
})
export class LayoutModule {}
