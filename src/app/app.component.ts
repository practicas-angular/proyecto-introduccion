import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SHARED_DIRECTIVES } from './shared/shared-directives';
import { SHARED_COMPONENTS } from './shared/shared-components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SHARED_DIRECTIVES, SHARED_COMPONENTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'proyecto-introduccion';
}
