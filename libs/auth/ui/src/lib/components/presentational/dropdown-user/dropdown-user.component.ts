import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '@auth0/auth0-angular';
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
