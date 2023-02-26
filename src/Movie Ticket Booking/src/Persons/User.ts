import Person from "./Person";
import AbstractNotification from "../Notifications/AbstractNotification";
import Ticket from "../Ticket";

export default class User extends Person {
  private money: number = 0;
  private readonly tickets = new Map<number, Ticket>();
  private readonly notifications: AbstractNotification[] = [];

  public addTicket(ticket: Ticket): void {
    this.tickets.set(ticket.getId(), ticket);
  }

  public removeTicket(ticket: Ticket): void {
    this.tickets.delete(ticket.getId())
  }

  public getMoney(): number {
    return this.money;
  }

  public addMoney(money: number): void {
    this.money += money;
  }

  public subtractMoney(money: number): number {
    if (this.money < money) {
      throw new Error('Not enough money');
    }

    this.money -= money;

    return money;
  }

  public notify(notification: AbstractNotification) {
    this.notifications.push(notification);
  }

  public getNotifications(): AbstractNotification[] {
    return this.notifications;
  }
}
