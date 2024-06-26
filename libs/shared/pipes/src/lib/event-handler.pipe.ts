import { AsyncPipe } from '@angular/common';
import type { OnDestroy, PipeTransform } from '@angular/core';
import { ChangeDetectorRef, inject, Pipe } from '@angular/core';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Pipe({
  name: 'event',
  pure: true,
  standalone: true,
})
export class EventHandlerPipe implements PipeTransform, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);

  // ------------------ //

  private asyncPipe: AsyncPipe;

  constructor() {
    this.asyncPipe = new AsyncPipe(this.cdr);
  }

  ngOnDestroy() {
    this.asyncPipe.ngOnDestroy();
  }

  transform<T>(event$: Observable<T>, method: (context?: T) => void): T | null {
    return this.asyncPipe.transform<T | null>(
      event$.pipe(
        tap((context: T) => {
          if (method instanceof Function) {
            method(context);
          } else {
            console.error('Event handler is not a function');
          }
        }),
      ),
    );
  }
}
