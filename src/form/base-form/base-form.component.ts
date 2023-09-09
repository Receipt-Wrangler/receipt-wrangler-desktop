import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig } from 'src/interfaces';
import { FormCommand } from '../interfaces/form-command';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
})
export class BaseFormComponent {
  public formConfig!: FormConfig;

  public form: FormGroup = new FormGroup({});

  @Output() public formCommand: EventEmitter<FormCommand> =
    new EventEmitter<FormCommand>();

  public handleFormCommand(formCommand: FormCommand): void {
    if (formCommand.path) {
      (this.form.get(formCommand.path) as any)[formCommand.command](
        formCommand.payload
      );
    } else {
      (this.form as any)[formCommand.command](formCommand.payload);
    }
  }

  public emitFormCommand(formCommand: FormCommand): void {
    this.formCommand.emit(formCommand);
  }
}
