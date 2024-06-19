import { bootstrapApplication } from '@angular/platform-browser';
import { RootInjector } from '@showtime/shared/utils';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

const bootstrapApp = async () => {
  const applicationReference = await bootstrapApplication(AppComponent, appConfig);
  RootInjector.setInjector(applicationReference.injector);
};

try {
  bootstrapApp();
} catch (error) {
  console.error(error);
}
