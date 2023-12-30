import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  const urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  return (control: AbstractControl): ValidationErrors | null => {
    return Validators.pattern(urlPattern)(control) ? { url: true } : null;
  };
}
