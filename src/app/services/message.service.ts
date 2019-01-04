import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: Message[] = [];

  add(msg: Message) {
    this.messages.push(msg);
  }

  clear() {
    this.messages = [];
  }
}
