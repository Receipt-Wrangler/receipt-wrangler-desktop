import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomlete',
  templateUrl: './autocomlete.component.html',
  styleUrls: ['./autocomlete.component.scss'],
})
export class AutocomleteComponent {
  @Input() public label: string = '';

  @Input() public inputFormControl: FormControl = new FormControl();

  @Input() public options: any[] = [];

  public filteredOptions: any[] = [];
}
