import { ChatSession } from './chatSession';
import { Message, MessageStatus, MessageType } from './Message';
import { User } from './User';
// 聊天场景
export class UserChat {
  private user: User;
  private msgs: Message[] = [];
  // 会话列表
  private sessions: Record<number, ChatSession> = {};
  constructor(user: User) {
    this.user = user;
  }
  // 发起会话
  public createChatSession(to: User) {
    if (this.sessions[to.getId()]) {
      return this.sessions[to.getId()];
    }
    const session = new ChatSession(this.user, to);
    this.sessions[to.getId()] = session;
    return session;
  }
  // 发送信息
  public send(msg: Message) {
    this.msgs.push(msg);
    msg.status = MessageStatus.SENDING;
    msg.type = MessageType.SEND;
  }
  // 接受消息
  public receive(msg: Message) {
    this.msgs.push(msg);
    msg.status = MessageStatus.RECEIVED;
    msg.type = MessageType.RECEIVED;
  }
  // 未读的信息批量阅读
  public readTo(lastId) {
    // 接受到最后一条信息之前的信息，都有可能是未读的
    const unReads = this.msgs.filter((x) => x.id <= lastId && x.status === MessageStatus.RECEIVED);
    unReads.forEach((item) => {
      item.status = MessageStatus.READED;
    });
  }
  // 未读
  public unReadMessage(lastId: number) {
    return this.msgs.filter((x) => x.id > lastId);
  }
}
