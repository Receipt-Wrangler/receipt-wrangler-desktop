import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Share, ShareStatus } from "../../open-api";

export function buildItemForm(item?: Share, receiptId?: string): FormGroup {
  return buildShareForm(item, receiptId);
}

export function buildShareForm(share?: Share, receiptId?: string): FormGroup {
  return new FormGroup({
    name: new FormControl(share?.name ?? "", Validators.required),
    chargedToUserId: new FormControl(share?.chargedToUserId ?? "", [
      Validators.required,
    ]),
    receiptId: new FormControl(Number(share?.receiptId ?? receiptId)),
    amount: new FormControl(share?.amount ?? undefined, [
      Validators.required,
      Validators.min(0),
      shareTotalValidator(),
    ]),
    isTaxed: new FormControl(share?.IsTaxed ?? false),
    categories: new FormArray(share?.categories?.map((c) => new FormControl(c)) ?? []),
    tags: new FormArray(share?.tags?.map((t) => new FormControl(t)) ?? []),
    status: new FormControl(
      share?.status ?? ShareStatus.Open,
      Validators.required
    ),
  });
}

function shareTotalValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const epsilon = 0.01;
    const errKey = "shareLargerThanTotal";

    const formArray = control.parent?.parent as FormArray;
    const amountControl = control?.parent?.parent?.parent;
    let receiptTotal: number = 1;
    if (amountControl) {
      const amountValue = amountControl.get("amount")?.value;
      if (amountValue !== undefined) {
        receiptTotal = Number.parseFloat(amountValue ?? "1");
      }
    }

    if (!formArray) {
      return null;
    }

    const shareControls = formArray.controls;
    const shareAmounts: number[] = shareControls
      .map((c) => c.get("amount")?.value ?? 0)
      .map((amount: any) => Number.parseFloat(amount) ?? 1);
    const sharesTotal = shareAmounts.reduce((a, b) => a + b);

    if (sharesTotal > receiptTotal + epsilon) {
      shareControls.forEach((c) => {
        if (c !== control) {
          c.get("amount")?.setErrors({
            [errKey]: "Share sum cannot be larger than receipt total",
          });
        }
      });
      return { [errKey]: "Share sum cannot be larger than receipt total" };
    } else {
      shareControls.forEach((c) => {
        if (c.get("amount")?.errors && c.get("amount")?.hasError(errKey)) {
          let newErrors = c.get("amount")?.errors ?? {};
          delete newErrors[errKey];
          c.get("amount")?.setErrors(newErrors);
        }
      });
      return null;
    }
  };
}
