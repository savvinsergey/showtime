import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersDomainModule } from '../../../domain/src';

@NgModule({
  imports: [CommonModule, UsersDomainModule],
})
export class UsersAbstractModule {}
