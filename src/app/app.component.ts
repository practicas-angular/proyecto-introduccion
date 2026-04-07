import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SHARED_IMPORTS } from './shared/shared-imports';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SHARED_IMPORTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'proyecto-introduccion';
}
