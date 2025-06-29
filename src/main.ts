import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideAnimations(), // ضروري لتشغيل التوست بشكل سلس
//     provideToastr({
//       positionClass: 'toast-bottom-right',
//       timeOut: 3000,
//       closeButton: true
//     }) // إعداد التوست
//   ]
// });
