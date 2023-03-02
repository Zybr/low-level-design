import Address from "../Address";

export default class Person {
  private money = 0;

  public constructor(
    private readonly name: string,
    private readonly phone: string,
    private readonly address: Address,
  ) {
  }

  public addMoney(money: number): this {
    this.money += money;

    return this;
  }

  public subtractMoney(money: number): this {
    if (money > this.money) {
      throw new Error('There is no enough money');
    }

    this.money -= money;

    return this;
  }

  public getMoney(): number {
    return this.money;
  }
}
