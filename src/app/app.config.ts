import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
//import { provideAnimations } from '@angular/platform-browser/animations';
//import { addTokenInterceptor } from './core/interceptors/add-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })
    , provideRouter(routes),
  //  provideAnimations(),
    provideHttpClient()
  ]
};
