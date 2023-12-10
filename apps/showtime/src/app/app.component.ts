import { ChangeDetectionStrategy, Component, inject, Injector, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, NgIf } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownUserContainer } from '@showtime/auth/ui';

@Component({
  standalone: true,
  imports: [RouterModule, HttpClientModule, InlineSVGModule, AsyncPipe, NgIf, DropdownUserContainer],
  selector: 'showtime-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public static appInjector: Injector;

  constructor() {
    AppComponent.appInjector = inject(Injector);
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
