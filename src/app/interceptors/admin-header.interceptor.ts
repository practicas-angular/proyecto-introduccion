import { HttpInterceptorFn } from '@angular/common/http';

export const adminHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Analizamos la URL de la petición entrante
  const isAdminRoute = req.url.includes('/admin');

  if (isAdminRoute) {
    // 2. Si coincide, clonamos la petición inyectando la cabecera personalizada
    const adminReq = req.clone({
      setHeaders: {
        'X-Admin': 'true',
      },
    });

    console.log(
      `Interceptor: Aplicando cabecera X-Admin a la ruta: ${req.url}`,
    );
    return next(adminReq);
  }

  // 3. Si no coincide, continuamos con la petición original sin modificar
  return next(req);
};
