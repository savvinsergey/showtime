import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventHandler',
  pure: true,
  standalone: true,
})
export class EventHandlerPipe implements PipeTransform {
  transform(value: any, method: () => void): any {
    if (!value) {
      return value;
    }

    if (method instanceof Function) {
      return method();
    }

    return value;
  }
}
