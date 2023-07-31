import { PipesModule } from "src/pipes/pipes.module";
import { ReceiptTableState } from "src/store/receipt-table.state";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ActivatedRoute } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { ApiModule } from "@noah231515/receipt-wrangler-core";

import { ReceiptsTableComponent } from "./receipts-table.component";

describe('ReceiptsTableComponent', () => {
  let component: ReceiptsTableComponent;
  let fixture: ComponentFixture<ReceiptsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptsTableComponent],
      imports: [
        ApiModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([ReceiptTableState]),
        ReactiveFormsModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatDialogModule,
        PipesModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                categories: [],
                tags: [],
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceiptsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
