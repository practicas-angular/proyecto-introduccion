import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resaltar',
  standalone: true,
})
export class ResaltarPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return `<b>${value}</b>`;
  }
}
