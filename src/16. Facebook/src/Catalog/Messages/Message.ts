import User from "../../Group/Users/User/User";

export default class Message {
  private readonly createdAt = new Date();
  private updatedAt = new Date();

  public constructor(
    private readonly author: User,
    private text: string,
  ) {
  }

  public getAuthor(): User {
    return this.author;
  }

  public getText(): string {
    return this.text;
  }

  public setText(text: string) {
    this.text = text;
    this.updateTime();
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  protected updateTime() {
    this.updatedAt = new Date();
  }
}
