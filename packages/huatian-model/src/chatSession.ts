import { Message } from './Message';
import { User } from './User';

export class ChatSession {
  private from: User;
  private to: User;
  public constructor(from: User, to: User) {
    this.from = from;
    this.to = to;
  }
  // 当前会话中可以聊天
  public chat(msg: Message) {
    this.from.chat().send(msg);
    this.to.chat().receive(msg)
  }
}
