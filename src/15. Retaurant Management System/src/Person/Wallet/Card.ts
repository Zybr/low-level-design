export default class Card {
  private amount: number = 0;

  public getAmount(): number {
    return this.amount;
  }

  public subtractAmount(amount: number): number {
    if (amount > this.amount) {
      throw new Error('There is not enough money');
    }

    this.amount -= amount;

    return amount;
  }

  public addMoney(amount: number): this {
    this.amount += amount;

    return this;
  }
}
