import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { NgTemplateOutlet, NgComponentOutlet, NgClass, NgStyle } from '@angular/common';
import { RoundButtonComponent } from '../../components/round-button/round-button.component';

interface IProducto {
  nombre: string
  precio: number
}

@Component({
  selector: 'app-testing-page-directives',
  imports: [SHARED_IMPORTS, NgTemplateOutlet, NgComponentOutlet, NgClass, NgStyle],
  templateUrl: './testing-page-directives.component.html',
  styleUrl: './testing-page-directives.component.scss',
  standalone: true
})

export class TestingPageDirectivesComponent {

  isAdmin: boolean = true
  productos: IProducto[] = [
    { nombre: "agua", precio: 2 },
    { nombre: "vino", precio: 5.5 },
    { nombre: "cerveza", precio: 4 },
  ]
  day: number = 1
  userName: string = "Gabino"
  selected_component = RoundButtonComponent
  color = 'blue'
}
