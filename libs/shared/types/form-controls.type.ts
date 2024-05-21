import type { FormControl } from '@angular/forms';

export type FormControls<T> = {
  [key in keyof T]: FormControl<T[key]>;
};
