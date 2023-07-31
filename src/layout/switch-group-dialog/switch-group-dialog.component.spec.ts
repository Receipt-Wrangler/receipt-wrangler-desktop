import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { PipesModule } from 'src/pipes/pipes.module';
import { PipesModule as CorePipesModule } from '@noah231515/receipt-wrangler-core';
import { SwitchGroupDialogComponent } from './switch-group-dialog.component';

describe('SwitchGroupDialogComponent', () => {
  let component: SwitchGroupDialogComponent;
  let fixture: ComponentFixture<SwitchGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwitchGroupDialogComponent],
      imports: [
        CorePipesModule,
        MatDialogModule,
        NgxsModule.forRoot([]),
        PipesModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
