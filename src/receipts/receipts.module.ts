import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ImageCropperModule } from "ngx-image-cropper";
import { AutocompleteModule } from "src/autocomplete/autocomplete.module";
import { AvatarModule } from "src/avatar";
import { DatepickerModule } from "src/datepicker/datepicker.module";
import { PipesModule } from "src/pipes/pipes.module";
import { RadioGroupModule } from "src/radio-group/radio-group.module";
import { SelectModule } from "src/select/select.module";
import { SharedUiModule } from "src/shared-ui/shared-ui.module";
import { SlideToggleModule } from "src/slide-toggle/slide-toggle.module";
import { TableModule } from "src/table/table.module";
import { TextareaModule } from "src/textarea/textarea.module";
import { UserAutocompleteModule } from "src/user-autocomplete/user-autocomplete.module";
import { ButtonModule } from "../button";
import { CarouselModule as ReceiptWranglerCarousel } from "../carousel/carousel.module";
import { DirectivesModule } from "../directives";
import { InputModule } from "../input";
import { BulkStatusUpdateComponent } from "./bulk-resolve-dialog/bulk-status-update-dialog.component";
import { ItemListComponent } from "./item-list/item-list.component";
import { QuickActionsDialogComponent } from "./quick-actions-dialog/quick-actions-dialog.component";
import { QuickScanDialogComponent } from "./quick-scan-dialog/quick-scan-dialog.component";
import { ReceiptCommentsComponent } from "./receipt-comments/receipt-comments.component";
import { ReceiptFormComponent } from "./receipt-form/receipt-form.component";
import { ReceiptsRoutingModule } from "./receipts-routing.module";
import { ReceiptsTableComponent } from "./receipts-table/receipts-table.component";
import { UploadImageComponent } from "./upload-image/upload-image.component";
import { UserTotalPipe } from "./user-total.pipe";

@NgModule({
  declarations: [
    BulkStatusUpdateComponent,
    ItemListComponent,
    QuickActionsDialogComponent,
    ReceiptCommentsComponent,
    ReceiptFormComponent,
    ReceiptsTableComponent,
    UploadImageComponent,
    UserTotalPipe,
    QuickScanDialogComponent,
  ],
  imports: [
    AutocompleteModule,
    AvatarModule,
    ButtonModule,
    CarouselModule,
    CarouselModule,
    CommonModule,
    DatepickerModule,
    DirectivesModule,
    DragDropModule,
    InputModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    PipesModule,
    PipesModule,
    RadioGroupModule,
    ReactiveFormsModule,
    ReceiptWranglerCarousel,
    ReceiptsRoutingModule,
    SelectModule,
    SharedUiModule,
    SlideToggleModule,
    TableModule,
    TextareaModule,
    UserAutocompleteModule,
    ImageCropperModule,
  ],
  exports: [
    UploadImageComponent
  ]
})
export class ReceiptsModule {}
