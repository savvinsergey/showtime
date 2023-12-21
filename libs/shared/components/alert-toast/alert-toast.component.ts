import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { InlineSVGModule } from 'ng-inline-svg-2';
import { Dismiss, DismissInterface } from 'flowbite';
import { EAlertTypes } from '../../enums/alert-types.enum';
import { asapScheduler } from 'rxjs';
import { ALERT_DEFAULT_DURATION } from '../../constants/alert-default-duration.const';

@Component({
  selector: 'st-alert-toast',
  templateUrl: 'alert-toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, InlineSVGModule],
})
export class AlertToastComponent implements AfterViewInit {
  @Input() type!: EAlertTypes;

  @ViewChild('alertEl') alertEl!: ElementRef;

  private alert!: DismissInterface;

  public readonly alertTypes = EAlertTypes;

  ngAfterViewInit() {
    const alertElement = this.alertEl?.nativeElement;
    const options = {
      duration: ALERT_DEFAULT_DURATION,
      timing: 'ease-in',
    };

    this.alert = new Dismiss(alertElement, null, options);

    asapScheduler.schedule(() => {
      this.close();
    }, 3000);
  }

  public onClose() {
    this.close();
  }

  public close() {
    this.alert.hide();
  }
}
