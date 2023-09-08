import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormMode } from 'src/enums/form-mode.enum';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@receipt-wrangler/receipt-wrangler-core';
import { SharedUiModule } from '../shared-ui.module';
import { NgxsModule } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        PipesModule,
        ReactiveFormsModule,
        ButtonModule,
        SharedUiModule,
        NgxsModule.forRoot([]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    });
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.formConfig = {
      headerText: 'test',
      mode: FormMode.add,
    };
    component.form = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
