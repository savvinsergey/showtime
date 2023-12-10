import { ApplicationRef, ComponentRef, inject, Injectable, OnDestroy, Type, ViewContainerRef } from '@angular/core';
import { asapScheduler, first, Subject, timeout, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalsService implements OnDestroy {
  private readonly appRef = inject(ApplicationRef);

  // ---------------- //

  private componentRef: ComponentRef<any> | undefined;
  private destroyedSource = new Subject<void>();

  public readonly destroyed$ = this.destroyedSource.asObservable();

  ngOnDestroy() {
    this.destroyedSource.complete();
  }

  public open<M, C>(component: Type<M>, context: C, data?: Record<string, any>): M {
    const rootViewContainerRef = this.appRef.components[0].injector.get(ViewContainerRef);

    this.componentRef = rootViewContainerRef.createComponent<M>(component);
    if (data) {
      this.componentRef.setInput('data', data);
    }

    const instance = this.componentRef?.instance;
    if (instance.open instanceof Function) {
      timer(0).subscribe(() => instance.open(context));
    } else {
      console.error(`Modal '${component.toString()}' has no implementation of 'open' method`);
    }

    if (instance.close instanceof Function) {
      const originalClose = instance.close.bind(instance);
      instance.close = () => {
        originalClose();
        asapScheduler.schedule(() => {
          this.destroy();
        });
      };
    } else {
      console.error(`Modal '${component.toString()}' has no implementation of 'close' method`);
    }

    return instance;
  }

  private destroy(): void {
    this.destroyedSource.next();

    this.componentRef?.destroy();
    this.componentRef = undefined;
  }
}
