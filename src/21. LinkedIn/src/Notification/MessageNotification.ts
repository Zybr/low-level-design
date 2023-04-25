import User from "../Auth/Users/User";

export default class MessageNotification {
  public constructor(
    receiver: User,
    private readonly sender: User,
    private readonly text: string,
  ) {
  }

  public getSender(): User {
    return this.sender;
  }

  public getText(): string {
    return this.text;
  }
}
