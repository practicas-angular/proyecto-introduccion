import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideAnimationsAsync(),
    provideTranslateService({
      // 1. RASTREO: Usa localStorage directamente aquí para decidir el idioma al arrancar
      defaultLanguage: localStorage.getItem('lang') ?? 'es',
      fallbackLang: localStorage.getItem('lang') ?? 'es',

      // 2. EL CARGADOR: Aquí se define dónde están los JSON
      loader: provideTranslateHttpLoader({
        prefix: "./assets/i18n/", // Ruta a la carpeta
        suffix: ".json"           // Extensión del archivo
      }),
    })
  ]
};
