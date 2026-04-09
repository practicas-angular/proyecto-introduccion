import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  // Inicializamos en false porque al arrancar no hay peticiones
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Exponemos el estado como un Observable para que el componente no pueda modificarlo directamente
  loading$ = this.loadingSubject.asObservable();

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }
}
