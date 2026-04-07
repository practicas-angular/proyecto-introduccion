import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CardComponent, FooterComponent],
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
