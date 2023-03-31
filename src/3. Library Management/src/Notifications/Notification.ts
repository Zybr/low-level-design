import AbstractNotificationObserver from "./Observers/AbstractNotificationObserver";

export default class Notification {
  private createdAt = new Date();

  public constructor(
    private content: string,
  ) {
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getContent(): string {
    return this.content;
  }

  public send(observer: AbstractNotificationObserver) {
    observer.notify(this);
  }
}
