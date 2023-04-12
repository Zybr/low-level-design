export default abstract class MoneySource {
  public money: number = 0;

  public getAmount(): number {
    return this.money;
  }

  public addMoney(amount: number) {
    this.money += amount;
  }

  public subMoney(amount: number) {
    if (amount > this.money) {
      throw new Error('There is not enough money');
    }

    this.money -= amount;
  }
}
