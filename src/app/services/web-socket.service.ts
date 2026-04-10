import { Injectable, signal } from "@angular/core";
import { ChatMessage } from "../models/chat.model";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket$: WebSocketSubject<ChatMessage> | undefined;
  public messages = signal<ChatMessage[]>([]);
  public status = signal<'Connected' | 'Disconnected'>('Disconnected');

  public connect() {
    if (this.socket$ && !this.socket$.closed) return;

    this.socket$ = webSocket({
      url: 'wss://echo.websocket.org',
      deserializer: (msg) => {
        try {
          return JSON.parse(msg.data);
        } catch {
          return msg.data;
        }
      },
      openObserver: { next: () => this.status.set('Connected') },
      closeObserver: { next: () => this.status.set('Disconnected') },
    });

    this.socket$.subscribe({
      next: (msg) => this.processMessage(msg),
      error: (err) => {
        console.error('Socket Error:', err);
        this.status.set('Disconnected');
      },
      complete: () => this.status.set('Disconnected'),
    });
  }

  private processMessage(msg: any) {
    let parsedMsg: ChatMessage;

    if (typeof msg === 'string') {
      parsedMsg = {
        type: 'status',
        text: msg,
        user: 'System',
        timestamp: new Date(),
      };
    } else {
      parsedMsg = msg;
    }

    this.messages.update((prev) => [...prev, parsedMsg]);
  }

  public send(payload: ChatMessage) {
    if (this.socket$ && !this.socket$.closed) {
      this.socket$.next(payload);
    } else {
      console.warn('Cannot send message: Socket is closed.');
    }
  }

  public closeConnection() {
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = undefined;
      this.status.set('Disconnected');
    }
  }

  public reconnect() {
    this.closeConnection();
    this.connect();
  }
}
