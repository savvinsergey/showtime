import { AsyncPipe, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownUserContainer } from '@showtime/auth/ui';
import { initFlowbite } from 'flowbite';
import { InlineSVGModule } from 'ng-inline-svg-2';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    InlineSVGModule,
    AsyncPipe,
    NgIf,
    DropdownUserContainer,
  ],
  selector: 'st-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
