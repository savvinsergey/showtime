import { InjectionToken } from '@angular/core';
import { AUTH_DOMAIN_COMMANDS } from './auth-domain-commands.const';
import { AUTH_DOMAIN_QUERIES } from './auth-domain-queries.const';

export const AUTH_DOMAIN = new InjectionToken<{
  name: string;
  commands: typeof AUTH_DOMAIN_COMMANDS;
  queries: typeof AUTH_DOMAIN_QUERIES;
}>('AUTH_DOMAIN');
