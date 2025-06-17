import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // Add this import
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Update the bootstrap call to include HTTP client
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient()  // Add the HTTP client provider
  ]
}).catch((err) => console.error(err));