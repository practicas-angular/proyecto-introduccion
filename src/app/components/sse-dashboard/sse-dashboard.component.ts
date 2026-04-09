import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sse-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sse-dashboard.component.html',
  styleUrl: './sse-dashboard.component.scss',
})
export class SseDashboardComponent implements OnInit, OnDestroy {
  // Guardamos la referencia para poder cerrarla luego
  private eventSource!: EventSource;
  connectionStatus: string = 'Connecting...';

  ngOnInit(): void {
    // EJERCICIO 1: Iniciar la conexión
    this.connectToServer();
  }

  connectToServer(): void {
    // 1. Instanciar EventSource (Apunta a tu puerto de backend, ej: 3000)
    this.eventSource = new EventSource('http://localhost:3000/events');

    // 2. Escuchar cuando se abre con éxito
    this.eventSource.onopen = (event) => {
      console.log('SSE Connection Opened:', event);
      this.connectionStatus = 'Connected';
    };
  }

  ngOnDestroy(): void {
    // Es vital cerrar la conexión al salir del componente
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
