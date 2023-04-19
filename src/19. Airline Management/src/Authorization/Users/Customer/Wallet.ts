export default class Wallet {
  private money: number = 0;

  public getAmount(): number {
    return this.money;
  }

  public add(amount: number) {
    this.money += amount;
  }

  public subtract(amount: number) {
    if (this.money < amount) {
      throw new Error('There is not enough money');
    }
    this.money -= amount;

    return amount;
  }
}
