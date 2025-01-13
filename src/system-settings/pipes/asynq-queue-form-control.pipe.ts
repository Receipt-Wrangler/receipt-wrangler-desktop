import { Pipe, PipeTransform } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Pipe({
  name: "asynqQueueFormControl",
})
export class AsynqQueueFormControlPipe implements PipeTransform {
  public transform(form: FormGroup, queueName: string, formKey: string): FormControl {
    const formControl = (form.get("asynqQueueConfigurations") as FormArray).controls.find(c => c.value["name"] === queueName);

    if (formControl) {
      return formControl.get(formKey) as FormControl;
    }

    throw new Error(`Form control with name ${queueName} not found`);
  }
}
