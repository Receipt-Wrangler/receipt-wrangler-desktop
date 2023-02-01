import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { ButtonModule } from 'src/button/button.module';
import { StoreModule } from '../../store/store.module';

import { AutocomleteComponent } from './autocomlete.component';

describe('AutocomleteComponent', () => {
  let component: AutocomleteComponent;
  let fixture: ComponentFixture<AutocomleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocomleteComponent],
      imports: [
        StoreModule,
        CommonModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatInputModule,
        MatChipsModule,
        MatIconModule,
        ButtonModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocomleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter the options when multiple is false', () => {
    component.options = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' },
    ];
    component.optionFilterKey = 'name';

    component.multiple = false;
    const result = component._filter('Option 1');
    expect(result).toEqual([{ id: 1, name: 'Option 1' }]);
  });

  it('should filter the options when multiple is true and values are selected', () => {
    const service = TestBed.inject(FormBuilder);
    component.options = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' },
    ];
    component.optionFilterKey = 'name';

    component.multiple = true;
    component.inputFormControl = new FormArray([
      new FormGroup({
        id: new FormControl(2),
        name: new FormControl('Option 2'),
      }),
    ]) as any;

    const result = component._filter('Option');
    console.log(result);
    expect(result).toEqual([
      { id: 1, name: 'Option 1' },
      { id: 3, name: 'Option 3' },
    ]);
  });

  it('should return an empty array when no options match the filter', () => {
    component.options = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' },
    ];
    component.optionFilterKey = 'name';

    component.multiple = false;
    const result = component._filter('Non-existing option');
    expect(result).toEqual([]);
  });
});
