import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // 1. Inyectamos directamente tu servicio de LocalStorage
  const storage = inject(LocalStorageService);
  // 2. Leemos manualmente la clave 'userToken'
  const token = storage.get('userToken');

  // 3. Lógica de clonación e inserción de cabecera
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  // Si no hay token en el storage, la petición sigue original
  return next(req);
};
