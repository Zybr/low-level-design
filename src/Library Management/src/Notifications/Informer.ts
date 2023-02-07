import AbstractUser from "../Users/Users/AbstractUser";
import BookItem from "../Catalog/Books/BookItem";
import Notification from "./Notification";

export default class Informer {
  public notifyOfAvailableBook(user: AbstractUser, item: BookItem): void {
    const message = `Book ${item.title} is available`;
    this.sendMessage(user, message);
  }

  public notifyOfOverdueBook(user: AbstractUser, item: BookItem): void {
    const message = `Book ${item.title} is overdue`;
    this.sendMessage(user, message);
  }

  private sendMessage(user: AbstractUser, message: string) {
    if (user.person.emailBox) {
      user.person.emailBox.notify(new Notification(message));
    } else if (user.person.postBox) {
      user.person.postBox.notify(new Notification(message));
    }
  }
}
