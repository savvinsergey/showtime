import { importProvidersFrom } from '@angular/core';
import type { Route } from '@angular/router';
import { AuthAbstractModule } from '@showtime/auth/abstract';
import { AuthUiFacade } from '@showtime/auth/ui/abstract';
import { MainLayoutComponent } from '@showtime/layout/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    providers: [importProvidersFrom(AuthAbstractModule.forFeature({ provideTo: AuthUiFacade }))],
    children: [
      {
        path: 'users',
        loadChildren: () => import('@showtime/app/users-management/Routes').then(m => m.appRoutes),
        data: { preload: true },
      },
    ],
  },
  // TODO: implement 404, 403
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
