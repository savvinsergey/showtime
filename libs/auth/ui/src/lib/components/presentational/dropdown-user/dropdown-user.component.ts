import { CommonModule } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { User } from '@auth0/auth0-angular';
import { initDropdowns } from 'flowbite';

import { DROPDOWN_USER_DEFAULT_CONFIG } from '../../../constants';

@Component({
  selector: 'st-dropdown-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dropdown-user.component.html',
  styleUrls: ['./dropdown-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownUserComponent implements OnInit {
  @Input() config = DROPDOWN_USER_DEFAULT_CONFIG;
  @Input() user!: User | null;

  @Output() signedIn = new EventEmitter<void>();
  @Output() signedOut = new EventEmitter<void>();

  ngOnInit() {
    initDropdowns();
  }
}
