import { AfterViewInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initDropdowns } from 'flowbite';

@Component({
  selector: 'uik-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements AfterViewInit {
  @Input({ required: true }) id!: string;

  ngAfterViewInit() {
    initDropdowns();
  }
}
