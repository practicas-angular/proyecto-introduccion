import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WebsocketService } from '../../services/web-socket.service';
import { ChatMessage } from '../../models/chat.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit, OnDestroy {
  // Inject the service
  private wsService = inject(WebsocketService);

  chatMessages = computed(() =>
    this.wsService.messages().filter((m) => m.type === 'chat'),
  );

  notifications = computed(() =>
    this.wsService.messages().filter((m) => m.type === 'notification'),
  );

  systemStatus = computed(() =>
    this.wsService.messages().filter((m) => m.type === 'status'),
  );

  ngOnInit(): void {
    this.wsService.connect();
  }

  ngOnDestroy(): void {
    this.wsService.closeConnection();
    // this.wsService.messages.set([]);

    console.log('🗑️ Component destroyed: Connection cleaned up.');
  }

  sendMessage(inputElement: HTMLInputElement): void {
    const text = inputElement.value.trim();
    if (text) {
      const newMessage: ChatMessage = {
        type: 'chat', // Mark this as a standard chat message
        text: text,
        user: 'Yo',
        timestamp: new Date(),
      };
      this.wsService.send(newMessage);
      inputElement.value = '';
    }
  }

  sendFakeNotification() {
    const notification: ChatMessage = {
      type: 'notification',
      text: `New Activity detected at ${new Date().toLocaleTimeString()}`,
      user: 'System',
      timestamp: new Date(),
    };
    this.wsService.send(notification);
  }

  sendFakeStatus() {
    const status: ChatMessage = {
      type: 'status',
      text: `CPU Usage: ${Math.floor(Math.random() * 100)}%`,
      user: 'Monitor',
      timestamp: new Date(),
    };
    this.wsService.send(status);
  }
}
