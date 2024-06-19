import { Injectable } from '@angular/core';
import type { IOnDemandPreloadOptions } from '@showtime/shared/interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnDemandPreloadService {
  private readonly stateSource = new Subject<IOnDemandPreloadOptions>();

  public readonly state$ = this.stateSource.asObservable();

  public startPreload(routePath: string): void {
    this.stateSource.next({ routePath, preload: true });
  }
}
