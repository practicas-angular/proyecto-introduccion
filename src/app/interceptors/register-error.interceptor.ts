import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const registerErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      // 1. Detectar si el servidor devuelve un error y mostrarlo por consola
      // Usamos error.status para identificar el código HTTP
      console.error(`Error detectado: Código ${error.status}`);

      // 2. Lógica opcional para error 401 (Unauthorized)
      if (error.status === 401) {
        console.error('Sesión expirada o no válida. Redirigiendo al login...');
        router.navigate(['/login']);
      }

      // 3. Lógica para otros errores comunes
      if (error.status === 404) {
        console.error('El recurso solicitado no existe (404).');
      }

      // Es obligatorio retornar el error para que el suscriptor original lo reciba
      return throwError(() => error);
    })
  );
};