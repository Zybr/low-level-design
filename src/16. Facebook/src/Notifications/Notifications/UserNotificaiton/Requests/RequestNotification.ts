import UserNotification from "../UserNotification";

export default abstract class RequestNotification extends UserNotification {
  private isHandled = false;

  public abstract accept();

  public reject() {
    this.assertNotHandled();
    this.handle();
  }

  protected assertNotHandled() {
    if (this.isHandled) {
      throw new Error('Request is already handled');
    }
  }

  protected handle() {
    this.isHandled = true;
  }
}
