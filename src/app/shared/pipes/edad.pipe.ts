import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad',
  standalone: true,
})
export class EdadPipe implements PipeTransform {
  transform(value: Date | string): number | string {
    if (!value) return '';

    const nacimiento = new Date(value);
    const hoy = new Date();

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    // Si aún no ha llegado su mes de cumple, o es su mes pero no su día, restamos 1
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  }
}
