import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SseDashboardComponent } from '../../components/sse-dashboard/sse-dashboard.component';

@Component({
  selector: 'app-sse',
  imports: [NavbarComponent, SseDashboardComponent, FooterComponent],
  templateUrl: './sse.component.html',
  styleUrl: './sse.component.scss'
})
export class SseComponent {

}
