import { InjectionToken } from '@angular/core';

export const ENVIRONMENT = new InjectionToken<{
  auth0Api: {
    url: string;
    clientId: string;
    clientSecret: string;
  };
}>('ENVIRONMENT');
