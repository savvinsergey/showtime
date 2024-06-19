import { CommonModule } from '@angular/common';
import type { ModuleWithProviders } from '@angular/core';
import { Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthApplicationModule } from '@showtime/auth/application';
import type { AbstractClass } from '@showtime/shared/types';

import { layoutImplementationsMap } from './constants/implementations.const';

@NgModule({
  imports: [CommonModule, AuthApplicationModule],
})
export class LayoutAbstractModule {
  public static forFeature(config: {
    provideTo: AbstractClass;
  }): ModuleWithProviders<LayoutAbstractModule> {
    const implementation = layoutImplementationsMap.get(config.provideTo);
    if (!implementation) {
      console.error(`Implementation for ${config.provideTo.toString()} facade was not found`);
      return {
        ngModule: LayoutAbstractModule,
        providers: [],
      };
    }

    return {
      ngModule: LayoutAbstractModule,
      providers: [
        {
          provide: config.provideTo,
          useFactory: (parentInjector: Injector, layoutFacade?: typeof config.provideTo) => {
            // Singleton for facade
            if (!layoutFacade) {
              const injector = Injector.create({
                providers: [
                  {
                    provide: config.provideTo,
                    useClass: implementation,
                  },
                ],
                parent: parentInjector,
              });
              layoutFacade = injector.get(config.provideTo);
            }

            return layoutFacade;
          },
          deps: [Injector, [new Optional(), new SkipSelf(), config.provideTo]],
        },
      ],
    };
  }
}
