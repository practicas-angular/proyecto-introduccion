import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';

@Component({
  selector: 'app-home',
  imports: [SHARED_IMPORTS],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomePage {
  name = 'Gabino'
  USERS = [
    { name: 'Juan', avatar: 'juan.png' },
    { name: 'Teresa', avatar: 'teresa.png' },
    { name: 'Ana', avatar: 'ana.png' },
  ]
}
