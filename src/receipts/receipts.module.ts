import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { AutocompleteModule } from 'src/autocomplete/autocomplete.module';
import { AvatarModule } from 'src/avatar';
import { ButtonModule } from 'src/button/button.module';
import { CarouselModule } from 'src/carousel/carousel.module';
import { DatepickerModule } from 'src/datepicker/datepicker.module';
import { InputModule } from 'src/input/input.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { RadioGroupModule } from 'src/radio-group/radio-group.module';
import { SelectModule } from 'src/select/select.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { SlideToggleModule } from 'src/slide-toggle/slide-toggle.module';
import { TableModule } from 'src/table/table.module';
import { TextareaModule } from 'src/textarea/textarea.module';
import { UserAutocompleteModule } from 'src/user-autocomplete/user-autocomplete.module';
import { BulkStatusUpdateComponent } from './bulk-resolve-dialog/bulk-status-update-dialog.component';
import { ItemListComponent } from './item-list/item-list.component';
import { QuickActionsDialogComponent } from './quick-actions-dialog/quick-actions-dialog.component';
import { ReceiptCommentsComponent } from './receipt-comments/receipt-comments.component';
import { ReplyButtonTextPipe } from './receipt-comments/reply-button-text.pipe';
import { TopLevelCommentPipe } from './receipt-comments/top-level-comment.pipe';
import { ReceiptFormComponent } from './receipt-form/receipt-form.component';
import { ReceiptsRoutingModule } from './receipts-routing.module';
import { ReceiptsTableComponent } from './receipts-table/receipts-table.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UserTotalPipe } from './user-total.pipe';
import { ReceiptFilterComponent } from './receipt-filter/receipt-filter.component';

@NgModule({
  declarations: [
    BulkStatusUpdateComponent,
    ItemListComponent,
    QuickActionsDialogComponent,
    ReceiptCommentsComponent,
    ReceiptFormComponent,
    ReceiptsTableComponent,
    ReplyButtonTextPipe,
    TopLevelCommentPipe,
    UploadImageComponent,
    UserTotalPipe,
    ReceiptFilterComponent,
  ],
  imports: [
    AutocompleteModule,
    AvatarModule,
    ButtonModule,
    CarouselModule,
    CommonModule,
    DatepickerModule,
    DragDropModule,
    InputModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTableModule,
    PipesModule,
    RadioGroupModule,
    ReactiveFormsModule,
    ReceiptsRoutingModule,
    SelectModule,
    SharedUiModule,
    SlideToggleModule,
    TableModule,
    TextareaModule,
    UserAutocompleteModule,
  ],
})
export class ReceiptsModule {}
