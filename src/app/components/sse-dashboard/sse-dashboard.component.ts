import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

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
  connectionStatus = signal('Disconnected');
  retryCount = signal(0);

  private sseSubscription?: Subscription;

  progress = signal(0);

  messages = signal<string[]>([]);

  //instead of any, we could use a interface for the data we expect from the server
  private createSseObservable(url: string): Observable<any> {
    return new Observable((observer) => {
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        observer.next({ type: 'message', content: data.message });
      };

      const progressHandler = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        observer.next({ type: 'progress', content: data.value });
      };
      eventSource.addEventListener('progress', progressHandler);

      const alertHandler = (event: MessageEvent) => {
        observer.next({ type: 'alert', content: event.data });
      };
      eventSource.addEventListener('alert', alertHandler);

      eventSource.onerror = (err) => {
        observer.error(err);
      };

      // 4. Teardown logic: This runs when we unsubscribe
      return () => {
        console.log('Teardown: Closing EventSource');
        eventSource.removeEventListener('progress', progressHandler);
        eventSource.removeEventListener('alert', alertHandler);
        eventSource.close();
      };
    });
  }

  ngOnInit(): void {
    //this.connect();
  }

  connect(): void {
    if (this.sseSubscription) return;

    this.connectionStatus.set('Connecting');

    this.sseSubscription = this.createSseObservable(
      'http://localhost:3001/events',
    ).subscribe({
      next: (data) => {
        this.connectionStatus.set('Connected'); // Update status on first message
        if (data.type === 'message') {
          this.messages.update((prev) => [...prev, data.content].slice(-10));
        } else if (data.type === 'progress') {
          this.progress.set(data.content);
        } else if (data.type === 'alert') {
          console.warn('SERVER ALERT:', data.content);
        }
      },
      error: (err) => {
        this.handleError();
      },
    });
  }

  private handleError() {
    this.connectionStatus.set('Retrying...');
    this.retryCount.update((c) => c + 1);
    this.stopStream();

    setTimeout(() => {
      if (this.connectionStatus() === 'Retrying...') this.connect();
    }, 5000);
  }

  private stopStream() {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
      this.sseSubscription = undefined;
    }
  }

  ngOnDestroy(): void {
    this.stopStream();
  }

  disconnect() {
    this.stopStream();
    this.connectionStatus.set('Disconnected');
  }

  clearLogs() {
    this.messages.set([]);
  }
}
