import { Component, OnInit, OnDestroy, signal } from '@angular/core';
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
  private eventSource!: EventSource | undefined;
  connectionStatus = signal('Disconnected')
  retryCount = signal(0);

  messages = signal<string[]>([]);

  ngOnInit(): void {
    //this.connect();
  }

  connect(): void {
    // 1. Instanciar EventSource (Apunta a tu puerto de backend, ej: 3000)
    this.eventSource = new EventSource('http://localhost:3001/events');

    this.connectionStatus.set('Connecting');

    // 2. Escuchar cuando se abre con éxito
    this.eventSource.onopen = (event) => {
      console.log('SSE Connection Opened:', event);
      this.connectionStatus.set('Connected');
    };

    this.eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      // Update our signal array with the new message
      //this.messages.update(prev => [...prev, newData.message]);
      // Keep only the last 10 items
      this.messages.update(prev => {
        const updatedList = [...prev, newData.message];
        return updatedList.slice(-10);
      });
    };

    this.eventSource.onerror = () => {
      /* this.connectionStatus.set('Disconnected');
      this.eventSource?.close(); */
      this.connectionStatus.set('Retrying...');
      this.retryCount.update(c => c + 1);

      // If the server is totally gone, EventSource might stop.
      // We can manually close and try again after 5 seconds.
      this.eventSource?.close();
      this.eventSource = undefined;

      setTimeout(() => {
        if (this.connectionStatus() === 'Retrying...') {
          this.connect();
        }
      }, 5000);
    };
  }

  ngOnDestroy(): void {
    // Es vital cerrar la conexión al salir del componente
    if (this.eventSource) {
      this.eventSource.close();
    }
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close(); // Actually kills the browser connection
      this.eventSource = undefined; // Clear the variable
      this.connectionStatus.set('Disconnected');
    }
  }

  clearLogs() {
    this.messages.set([]);
  }
}
