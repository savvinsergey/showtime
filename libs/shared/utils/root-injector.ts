import type { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';

export class RootInjector {
  private static rootInjector: Injector;

  static setInjector(injector: Injector) {
    if (RootInjector.rootInjector) {
      return;
    }

    RootInjector.rootInjector = injector;
  }

  static get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T {
    try {
      return RootInjector.rootInjector.get(token, notFoundValue, flags);
    } catch {
      console.error(
        `Error getting ${token} from RootInjector. This is likely due to RootInjector is undefined. Please check RootInjector.rootInjector value.`,
      );
      return null as T;
    }
  }
}
