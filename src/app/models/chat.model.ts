export interface ChatMessage {
  type: 'chat' | 'notification' | 'status';
  text: string;
  user: string;
  timestamp: Date;
}
