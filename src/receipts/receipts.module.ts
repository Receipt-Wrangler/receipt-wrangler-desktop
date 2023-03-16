import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { AutocompleteModule } from 'src/autocomplete/autocomplete.module';
import { ButtonModule } from 'src/button/button.module';
import { CarouselModule } from 'src/carousel/carousel.module';
import { DatepickerModule } from 'src/datepicker/datepicker.module';
import { InputModule } from 'src/input/input.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { RadioGroupModule } from 'src/radio-group/radio-group.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { SlideToggleModule } from 'src/slide-toggle/slide-toggle.module';
import { TableModule } from 'src/table/table.module';
import { TextareaModule } from 'src/textarea/textarea.module';
import { UserAutocompleteModule } from 'src/user-autocomplete/user-autocomplete.module';
import { ItemListComponent } from './item-list/item-list.component';
import { QuickActionsDialogComponent } from './quick-actions-dialog/quick-actions-dialog.component';
import { ReceiptCommentsComponent } from './receipt-comments/receipt-comments.component';
import { ReceiptFormComponent } from './receipt-form/receipt-form.component';
import { ReceiptsRoutingModule } from './receipts-routing.module';
import { ReceiptsTableComponent } from './receipts-table/receipts-table.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UserTotalPipe } from './user-total.pipe';

@NgModule({
  declarations: [
    ItemListComponent,
    QuickActionsDialogComponent,
    ReceiptFormComponent,
    ReceiptsTableComponent,
    UploadImageComponent,
    UserTotalPipe,
    ReceiptCommentsComponent,
  ],
  imports: [
    AutocompleteModule,
    ButtonModule,
    CarouselModule,
    CommonModule,
    DatepickerModule,
    InputModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTableModule,
    PipesModule,
    RadioGroupModule,
    ReactiveFormsModule,
    ReceiptsRoutingModule,
    SharedUiModule,
    SlideToggleModule,
    UserAutocompleteModule,
    TableModule,
    TextareaModule,
  ],
})
export class ReceiptsModule {}
