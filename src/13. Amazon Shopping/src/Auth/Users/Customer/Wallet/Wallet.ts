import Card from "./Card";

export default class Wallet {
  private cash: number = 0;
  private card: Card | null = null;

  public getTotalMoney(): number {
    return this.cash + (this.card?.getMoney() || 0);
  }

  public getCash(): number {
    return this.cash;
  }

  public addCash(amount: number): void {
    this.cash += amount;
  }

  public subtractCash(amount: number): number {
    if (this.cash < amount) {
      throw new Error('There is no enough cash');
    }

    this.cash -= amount;

    return amount;
  }

  public getCard(): Card | null {
    return this.card;
  }

  public setCard(card: Card | null): void {
    this.card = card;
  }
}
