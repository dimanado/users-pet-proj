import { FormControl } from '@angular/forms';

export const removeError = (formControl: FormControl, errorKey: string) => {
  const errors = { ...formControl.errors };

  if (errors && errors[errorKey]) {
    delete errors[errorKey];
    formControl.setErrors(errors);
    formControl.updateValueAndValidity();
  }
}
