export default class Account {
  private money: number = 0;

  public total(): number {
    return this.money;
  }

  public add(money: number): this {
    this.money += money;

    return this;
  }

  public remove(money: number): this {
    this.money -= money;

    return this;
  }
}
