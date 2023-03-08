import User from "../../User";
import Card from "../Card";
import Bank from "../Bank";

export default abstract class Account {
  private static currentId = 0;
  private readonly id: number;
  private readonly card: Card;
  private readonly pin: number;
  private money: number = 0;

  public constructor(
    bank: Bank,
    private readonly user: User,
    private readonly limit: number,
  ) {
    this.id = ++Account.currentId;
    this.card = new Card(
      bank.getId(),
      this.getId()
    );
    this.pin = 1000 + Math.floor(Math.random() * 9000);
    this.user.setCard(this.card);
    this.user.setPin(this.pin);
  }

  public getId(): number {
    return this.id;
  }

  public getLimit(): number {
    return this.limit;
  }

  public getUser(): User {
    return this.user;
  }

  public getMoney(): number {
    return this.money;
  }

  public getCard(): Card {
    return this.card;
  }

  public isValid(pin: number): boolean {
    return this.pin === pin;
  }

  public subMoney(amount: number): number {
    if (amount > this.money) {
      throw new Error('Account has not enough money');
    }

    if (amount > this.limit) {
      throw new Error('Amount overs the account limit')
    }

    this.money -= amount;

    return amount;
  }

  public addMoney(amount: number) {
    this.money += amount;
  }
}
