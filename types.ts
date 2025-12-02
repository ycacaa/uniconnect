export interface ServiceData {
  title: string;
  items: string[];
}

export interface PaymentData {
  title: string;
  details: string;
  items?: string[];
  actionLabel: string;
  actionUrl?: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}