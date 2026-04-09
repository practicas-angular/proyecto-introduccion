import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // 1. Al iniciar la petición, activamos el spinner
  loadingService.show();

  return next(req).pipe(
    // 2. Al finalizar (éxito o error), ocultamos el spinner
    //delay(1000), // Simula un retraso para ver el spinner en acción
    finalize(() => {
      loadingService.hide();
    }),
  );
};
