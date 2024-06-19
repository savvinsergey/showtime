import { HttpClientModule } from '@angular/common/http';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  selector: 'st-shell',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
