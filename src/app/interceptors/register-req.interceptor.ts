import { HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs';

export const registerReqInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Log de la petición (Método y URL)
  console.log(`Petición: ${req.method} a ${req.url}`);
  console.log(`Authorization:${req.headers.get('Authorization')}`);

  return next(req).pipe(
    tap({
      next: (event) => {
        // 2. Log de la respuesta exitosa (Estado)
        if (event.type === HttpEventType.Response) {
          console.log(`Respuesta recibida. Estado: ${event.status}`);
        }
      },
      error: (err) => {
        // 3. Log de la respuesta errónea (Estado)
        console.log(`Respuesta con error. Estado: ${err.status}`);
      }
    })
  );
};