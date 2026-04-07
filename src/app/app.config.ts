import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

// Función auxiliar para obtener el idioma de forma segura
const getSavedLang = (): string => {
  // Comprobamos si estamos en el navegador (donde existe 'window')
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('lang') ?? 'es';
  }
  return 'es'; // Idioma por defecto si estamos en el servidor
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideAnimationsAsync(),
    provideTranslateService({
      defaultLanguage: getSavedLang(),

      // 2. EL CARGADOR: Aquí se define dónde están los JSON
      loader: provideTranslateHttpLoader({
        prefix: "/assets/i18n/", // Ruta a la carpeta
        suffix: ".json"           // Extensión del archivo
      }),
    })
  ]
};
