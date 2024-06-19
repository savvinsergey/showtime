import { withModuleFederation } from '@nx/angular/module-federation';

export default withModuleFederation({
  name: 'users-management',
  exposes: {
    './Routes': 'apps/users-management/src/app/app.routes.ts',
  },
  additionalShared: [
    ['@angular/core', { singleton: true, eager: false, requiredVersion: false }],
    ['@angular/platform-browser', { singleton: true, eager: false, requiredVersion: false }],
    ['@angular/common', { singleton: true, eager: false, requiredVersion: false }],
    ['@angular/common/http', { singleton: true, eager: false, requiredVersion: false }],
    ['@angular/router', { singleton: true, eager: false, requiredVersion: false }],
    ['@angular/core/rxjs-interop', { singleton: true, eager: false, requiredVersion: false }],
    ['@auth0/auth0-angular', { singleton: true, eager: false, requiredVersion: false }],
    ['ng-inline-svg-2', { singleton: true, eager: false, requiredVersion: false }],
    ['rxjs', { singleton: true, eager: false, requiredVersion: false }],
    ['rxjs/operators', { singleton: true, eager: false, requiredVersion: false }],

    ['@showtime/auth/abstract', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/auth/application', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/auth/infra', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/auth/utils', { singleton: true, eager: false, requiredVersion: false }],

    ['@showtime/shared/components', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/shared/const', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/shared/decorators', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/shared/interfaces', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/shared/operators', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/shared/pipes', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/shared/services', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/shared/types', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/shared/utils', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/shared/validators', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/shared/directives', { singleton: true, eager: false, requiredVersion: false }],

    ['@showtime/initializer', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/ui-kit', { singleton: true, eager: false, requiredVersion: false }],

    ['@showtime/users/abstract', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/users/application', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/users/infra', { singleton: true, eager: false, requiredVersion: false }],
    ['@showtime/users/utils', { singleton: true, eager: false, requiredVersion: false }],
  ],
});
