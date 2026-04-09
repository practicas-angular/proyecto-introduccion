import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  LowerCasePipe,
  PercentPipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { SaludoPipe } from '../../shared/pipes/saludo.pipe';
import { DoblePipe } from '../../shared/pipes/doble.pipe';
import { ResaltarPipe } from '../../shared/pipes/resaltar.pipe';
import { EdadPipe } from '../../shared/pipes/edad.pipe';

@Component({
  selector: 'app-pipes',
  imports: [
    NavbarComponent,
    FooterComponent,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    SlicePipe,
    JsonPipe,
    SaludoPipe,
    DoblePipe,
    ResaltarPipe,
    EdadPipe,
  ],
  templateUrl: './pipes.component.html',
  styleUrl: './pipes.component.scss',
})
export class PipesComponent {
  today = new Date();
  userObject = {
    id: 1,
    nombre: 'Juan',
    email: 'juan@mail.com',
    roles: ['admin', 'editor'],
  };
}
