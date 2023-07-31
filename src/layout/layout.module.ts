import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AutocompleteModule } from 'src/autocomplete/autocomplete.module';
import {
  ButtonModule,
  PipesModule as CorePipesModule,
  DirectivesModule,
} from '@noah231515/receipt-wrangler-core';
import { PipesModule } from 'src/pipes/pipes.module';
import { SearchbarModule } from 'src/searchbar/searchbar.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { AvatarModule } from '../avatar';
import { AddReceiptIconComponent } from './add-receipt-icon/add-receipt-icon.component';
import { DashboardIconComponent } from './dashboard-icon/dashboard-icon.component';
import { HeaderComponent } from './header/header.component';
import { ReceiptListIconComponent } from './receipt-list-icon/receipt-list-icon.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SwitchGroupDialogComponent } from './switch-group-dialog/switch-group-dialog.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsModule } from 'src/notifications/notifications.module';

@NgModule({
  declarations: [
    AddReceiptIconComponent,
    DashboardIconComponent,
    HeaderComponent,
    ReceiptListIconComponent,
    SidebarComponent,
    SwitchGroupDialogComponent,
  ],
  imports: [
    AutocompleteModule,
    AvatarModule,
    ButtonModule,
    CommonModule,
    CorePipesModule,
    DirectivesModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatTooltipModule,
    NgbPopoverModule,
    NotificationsModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    SearchbarModule,
    SharedUiModule,
  ],
  exports: [HeaderComponent, AddReceiptIconComponent],
})
export class LayoutModule {}
