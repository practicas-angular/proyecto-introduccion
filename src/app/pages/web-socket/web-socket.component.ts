import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatComponent } from '../../components/chat/chat.component';

@Component({
  selector: 'app-web-socket',
  imports: [NavbarComponent, ChatComponent, FooterComponent],
  templateUrl: './web-socket.component.html',
  styleUrl: './web-socket.component.scss'
})
export class WebSocketComponent {

}
