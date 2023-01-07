import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Item } from 'src/models/item';

export function buildItemForm(item?: Item, receiptId?: string): FormGroup {
  return new FormGroup({
    name: new FormControl(item?.name ?? '', Validators.required),
    chargedToUserId: new FormControl(item?.chargedToUserId ?? '', [
      Validators.required,
    ]),
    receiptId: new FormControl(item?.receiptId ?? receiptId),
    amount: new FormControl(item?.amount ?? 1, [
      Validators.required,
      Validators.min(1),
      itemTotalValidator(),
    ]),
    isTaxed: new FormControl(item?.isTaxed ?? false),
  });
}

function itemTotalValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const errKey = 'itemLargerThanTotal';

    const formArray = control.parent?.parent as FormArray;
    const amountControl = control?.parent?.parent?.parent;
    let receiptTotal: number = 1;
    if (amountControl) {
      const amountValue = amountControl.get('amount')?.value;
      if (amountValue !== undefined) {
        receiptTotal = Number.parseFloat(amountValue ?? '1');
      }
    }

    if (!formArray) {
      return null;
    }

    const itemControls = formArray.controls;
    const itemsAmounts: number[] = itemControls
      .map((c) => c.get('amount')?.value ?? 0)
      .map((amount: any) => Number.parseFloat(amount) ?? 1);
    const itemsTotal = itemsAmounts.reduce((a, b) => a + b);

    if (itemsTotal > receiptTotal) {
      return { [errKey]: 'Error message' };
    } else {
      itemControls.forEach((c) => {
        if (c.errors && c.hasError(errKey)) {
          let newErrors = c.errors;
          delete newErrors[errKey];
          c.setErrors(newErrors);
        }
      });
      return null;
    }
  };
}
