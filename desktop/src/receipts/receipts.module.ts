import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptsTableComponent } from './receipts-table/receipts-table.component';
import { ReceiptsRoutingModule } from './receipts-routing.module';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/pipes/pipes.module';
import { SlideToggleModule } from 'src/slide-toggle/slide-toggle.module';
import { ButtonModule } from 'src/button/button.module';
import { ReceiptFormComponent } from './receipt-form/receipt-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from 'src/input/input.module';
import { AutocompleteModule } from 'src/autocomplete/autocomplete.module';
import { DatepickerModule } from 'src/datepicker/datepicker.module';
import { ItemListComponent } from './item-list/item-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserTotalPipe } from './user-total.pipe';
import { QuickActionsDialogComponent } from './quick-actions-dialog/quick-actions-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RadioGroupModule } from 'src/radio-group/radio-group.module';
import { UserAutocompleteModule } from 'src/user-autocomplete/user-autocomplete.module';
import { UploadImageComponent } from './upload-image/upload-image.component';
@NgModule({
  declarations: [
    ReceiptsTableComponent,
    ReceiptFormComponent,
    ItemListComponent,
    UserTotalPipe,
    QuickActionsDialogComponent,
    UploadImageComponent,
  ],
  imports: [
    CommonModule,
    ReceiptsRoutingModule,
    MatTableModule,
    PipesModule,
    SlideToggleModule,
    ButtonModule,
    ReactiveFormsModule,
    InputModule,
    AutocompleteModule,
    DatepickerModule,
    MatExpansionModule,
    MatDialogModule,
    RadioGroupModule,
    UserAutocompleteModule,
  ],
})
export class ReceiptsModule {}
