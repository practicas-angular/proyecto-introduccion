import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doble',
  standalone: true,
})
export class DoblePipe implements PipeTransform {
  transform(value: number): number {
    // Si el valor no es un número (por seguridad), devolvemos 0 o el valor original
    if (typeof value !== 'number') {
      return 0;
    }

    return value * 2;
  }
}
