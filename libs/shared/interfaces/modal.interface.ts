import type { IModalData } from './modal-data.interface';

export interface IModal<C> {
  open: (context: C) => void;
  close: () => void;
  data?: IModalData;
}
