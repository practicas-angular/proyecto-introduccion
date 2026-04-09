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

@Component({
  selector: 'app-admin',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
