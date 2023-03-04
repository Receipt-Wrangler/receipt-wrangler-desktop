import { FormGroup } from '@angular/forms';

export function applyApiErrors(form: FormGroup, errors: any): void {
  const keys = Array.from(Object.keys(errors?.error));

  keys?.forEach((k) => {
    const field = form.get(k);
    if (field) {
      field.setErrors({
        ...form.errors,
        error: errors.error[k],
      });
    }
  });
}
