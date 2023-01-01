import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-autocomlete',
  templateUrl: './autocomlete.component.html',
  styleUrls: ['./autocomlete.component.scss'],
})
export class AutocomleteComponent implements OnInit {
  @Input() public label: string = '';

  @Input() public inputFormControl: FormControl = new FormControl();

  @Input() public options: any[] = [];

  @Input() public optionTemplate!: TemplateRef<any>;

  @Input() public optionFilterKey: string = '';

  @Input() public optionValueKey: string = '  ';

  @Input() public displayWith!: (value: any) => string;

  public filteredOptions: Observable<any[]> = of([]);

  public filterFormControl: FormControl = new FormControl('');

  public ngOnInit(): void {
    this.filteredOptions = this.filterFormControl.valueChanges.pipe(
      startWith(this.filterFormControl.value),
      map((value) => {
        return this._filter(value);
      })
    );
  }

  private _filter(value: string): string[] {
    if (value) {
      const filterValue = value.toString().toLowerCase();

      return this.options.filter((option) =>
        option[this.optionFilterKey].toLowerCase().includes(filterValue)
      );
    }
    return this.options;
  }

  public optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.inputFormControl.setValue(event.option.value);
  }
}
