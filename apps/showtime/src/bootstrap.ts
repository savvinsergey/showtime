import { bootstrapApplication } from '@angular/platform-browser';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { RootInjector } from '../../../libs/shared/utils/root-injector';
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
