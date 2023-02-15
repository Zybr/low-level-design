export default class Account {
  private money: number = 0;

  public addMoney(money: number) {
    this.money += money;
  }

  public minusMoney(money: number) {
    this.money -= money;
  }

  public getMoney(): number {
    return this.money;
  }
}
