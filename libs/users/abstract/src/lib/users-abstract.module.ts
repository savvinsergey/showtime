import { CommonModule } from '@angular/common';
import type { ModuleWithProviders } from '@angular/core';
import { Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthApplicationModule } from '@showtime/auth/application';
import type { AbstractClass } from '@showtime/shared/types';
import { UsersApplicationModule } from '@showtime/users/application';

import { usersImplementationsMap } from './constants/implementations.const';

@NgModule({
  imports: [CommonModule, UsersApplicationModule, AuthApplicationModule],
})
export class UsersAbstractModule {
  public static forFeature(config: {
    provideTo: AbstractClass;
  }): ModuleWithProviders<UsersAbstractModule> {
    const implementation = usersImplementationsMap.get(config.provideTo);
    if (!implementation) {
      console.error(`Implementation for ${config.provideTo.toString()} facade was not found`);
      return {
        ngModule: UsersAbstractModule,
        providers: [],
      };
    }

    return {
      ngModule: UsersAbstractModule,
      providers: [
        {
          provide: config.provideTo,
          useFactory: (parentInjector: Injector, facade?: typeof config.provideTo) => {
            // Singleton for facade
            if (!facade) {
              const injector = Injector.create({
                providers: [
                  {
                    provide: config.provideTo,
                    useClass: implementation,
                  },
                ],
                parent: parentInjector,
              });
              facade = injector.get(config.provideTo);
            }

            return facade;
          },
          deps: [Injector, [new Optional(), new SkipSelf(), config.provideTo]],
        },
      ],
    };
  }
}
