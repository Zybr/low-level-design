export default class Card {
  public money: number = 0;

  public getMoney(): number {
    return this.money;
  }

  public addMoney(amount: number): void {
    this.money += amount
  }

  public subtractMoney(amount: number): number {
    if (this.money < amount) {
      throw new Error('There is not enough money');
    }

    this.money -= amount;

    return amount;
  }
}
