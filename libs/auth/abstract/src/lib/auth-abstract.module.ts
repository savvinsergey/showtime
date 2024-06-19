import { CommonModule } from '@angular/common';
import type { ModuleWithProviders } from '@angular/core';
import { Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthApplicationModule } from '@showtime/auth/application';
import type { AbstractClass } from '@showtime/shared/types';

import { authImplementationsMap } from './constants/implementations.const';

@NgModule({
  imports: [CommonModule, AuthApplicationModule],
})
export class AuthAbstractModule {
  public static forFeature(config: {
    provideTo: AbstractClass;
  }): ModuleWithProviders<AuthAbstractModule> {
    const implementation = authImplementationsMap.get(config.provideTo);
    if (!implementation) {
      console.error(`Implementation for ${config.provideTo.toString()} facade was not found`);
      return {
        ngModule: AuthAbstractModule,
        providers: [],
      };
    }

    return {
      ngModule: AuthAbstractModule,
      providers: [
        {
          provide: config.provideTo,
          useFactory: (parentInjector: Injector, authFacade?: typeof config.provideTo) => {
            // Singleton for facade
            if (!authFacade) {
              const injector = Injector.create({
                providers: [
                  {
                    provide: config.provideTo,
                    useClass: implementation,
                  },
                ],
                parent: parentInjector,
              });
              authFacade = injector.get(config.provideTo);
            }

            return authFacade;
          },
          deps: [Injector, [new Optional(), new SkipSelf(), config.provideTo]],
        },
      ],
    };
  }
}
