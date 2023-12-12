import { Pipe, PipeTransform } from '@angular/core';
import { IEventHandler } from '../../interfaces/event-handler.interface';

@Pipe({
  name: 'eventHandler',
  pure: true,
  standalone: true,
})
export class EventHandlerPipe implements PipeTransform {
  transform(event: IEventHandler | null, method: (context?: any) => void): any {
    if (!event) {
      return event;
    }

    const { value, context } = event;

    if (!value) {
      return event;
    }

    if (method instanceof Function) {
      return method(context);
    }

    return event;
  }
}
