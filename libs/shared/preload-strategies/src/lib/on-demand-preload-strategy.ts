import { inject, Injectable } from '@angular/core';
import type { PreloadingStrategy, Route } from '@angular/router';
import type { IOnDemandPreloadOptions } from '@showtime/shared/interfaces';
import { OnDemandPreloadService } from '@showtime/shared/services';
import type { Observable } from 'rxjs';
import { EMPTY, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
  deps: [OnDemandPreloadService],
})
export class OnDemandPreloadStrategy implements PreloadingStrategy {
  private readonly preloadOnDemandService = inject(OnDemandPreloadService);

  // ------------------- //

  public preload(route: Route, load: () => Observable<never>): Observable<never> {
    return this.preloadOnDemandService.state$.pipe(
      mergeMap(preloadOptions => {
        const shouldPreload = this.preloadCheck(route, preloadOptions);
        return shouldPreload ? load() : EMPTY;
      }),
    );
  }

  private preloadCheck(route: Route, preloadOptions: IOnDemandPreloadOptions) {
    return (
      route.data?.['preload'] &&
      [route.path, '*'].includes(preloadOptions.routePath) &&
      preloadOptions.preload
    );
  }
}
