import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { untilDestroyed } from "@ngneat/until-destroy";
import { startWith, tap } from "rxjs";

export function buildReceiptFilterForm(filter: any, thisContext: any): FormGroup {
  return new FormGroup({
    date: buildFieldFormGroup(
      filter?.date?.value,
      filter?.date?.operation,
      thisContext
    ),
    amount: buildFieldFormGroup(
      filter?.amount?.value,
      filter?.amount?.operation,
      thisContext
    ),
    name: buildFieldFormGroup(
      filter?.name?.value,
      filter?.name?.operation,
      thisContext
    ),
    paidBy: buildFieldFormGroup(
      filter?.paidBy?.value ?? [],
      filter?.paidBy?.operation,
      thisContext,
      true
    ),
    categories: buildFieldFormGroup(
      filter?.categories?.value ?? [],
      filter?.categories?.operation,
      thisContext,
      true
    ),
    tags: buildFieldFormGroup(
      filter?.tags?.value ?? [],
      filter?.tags?.operation,
      thisContext,
      true
    ),
    status: buildFieldFormGroup(
      filter?.status?.value ?? [],
      filter?.status?.operation,
      thisContext,
      true
    ),
    resolvedDate: buildFieldFormGroup(
      filter?.resolvedDate?.value,
      filter?.resolvedDate?.operation,
      thisContext,
    ),
    createdAt: buildFieldFormGroup(
      filter?.createdAt?.value,
      filter?.createdAt?.operation,
      thisContext,
    ),
  });
}


function buildFieldFormGroup(
  value: string | string[] | number | any,
  operation: string | undefined,
  thisContext: any,
  isArray?: boolean,
): FormGroup {
  const formBuilder = new FormBuilder();
  let valueControl: AbstractControl;
  const operationControl = formBuilder.control(operation);
  if (isArray) {
    valueControl = formBuilder.array(value);
  } else {
    valueControl = formBuilder.control(value);
  }

  valueControl.valueChanges.pipe(
    untilDestroyed(thisContext),
    startWith(value),
    tap((value) => {
      if (!!value && value?.length > 0) {
        operationControl.addValidators(Validators.required);
      } else {
        operationControl.removeValidators(Validators.required);
      }

    })).subscribe();

  return formBuilder.group({
    operation: operationControl,
    value: valueControl
  });
}
