import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoginService } from './Services/login.service';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
              provideHttpClient(withFetch()),LoginService,
               provideAnimations(), // ✅ مهم جداً
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 4000,
      closeButton: true
    })
  ]
};
