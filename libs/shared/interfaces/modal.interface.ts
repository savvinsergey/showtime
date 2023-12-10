import { Observable } from 'rxjs';
import { EAsyncStatusesCqrs } from '../enums';

export interface IModal<C> {
  open: (context: C) => void;
  close: () => void;
  data?: Record<string, any>;
}
