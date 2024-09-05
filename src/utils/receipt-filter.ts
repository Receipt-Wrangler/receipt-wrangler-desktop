import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";

export function buildReceiptFilterForm(filter: any): FormGroup {
  return new FormGroup({
    date: buildFieldFormGroup(
      filter?.date?.value,
      filter?.date?.operation
    ),
    amount: buildFieldFormGroup(
      filter?.amount?.value,
      filter?.amount?.operation
    ),
    name: buildFieldFormGroup(
      filter?.name?.value,
      filter?.name?.operation
    ),
    paidBy: buildFieldFormGroup(
      filter?.paidBy?.value ?? [],
      filter?.paidBy?.operation,
      true
    ),
    categories: buildFieldFormGroup(
      filter?.categories?.value ?? [],
      filter?.categories?.operation,
      true
    ),
    tags: buildFieldFormGroup(
      filter?.tags?.value ?? [],
      filter?.tags?.operation,
      true
    ),
    status: buildFieldFormGroup(
      filter?.status?.value ?? [],
      filter?.status?.operation,
      true
    ),
    resolvedDate: buildFieldFormGroup(
      filter?.resolvedDate?.value,
      filter?.resolvedDate?.operation
    ),
    createdAt: buildFieldFormGroup(
      filter?.createdAt?.value,
      filter?.createdAt?.operation
    ),
  });
}


function buildFieldFormGroup(
  value: string | string[] | number | any,
  operation: string | undefined,
  isArray?: boolean
): FormGroup {
  const formBuilder = new FormBuilder();
  let control: AbstractControl;
  if (isArray) {
    control = formBuilder.array(value);
  } else {
    control = formBuilder.control(value);
  }

  return formBuilder.group({
    operation: operation,
    value: control
  });
}
