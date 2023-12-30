import { ChangeDetectorRef, inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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

  transform<T>(event$: Observable<T>, method: (context?: any) => void): T | null {
    return this.asyncPipe.transform<T | null>(
      event$.pipe(
        tap((context: any) => {
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
