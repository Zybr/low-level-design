import Card from "./Card";

export default class Wallet {
  private readonly cards = new Set<Card>();
  private cash: number = 0;

  public getCards(): Card[] {
    return Array.from(this.cards);
  }

  public addCard(card: Card): void {
    this.cards.add(card);
  }

  public removeCard(card: Card): void {
    this.cards.delete(card);
  }

  public getCashAmount(): number {
    return this.cash;
  }

  public subtractCash(amount: number): number {
    if (amount > this.cash) {
      throw new Error('There is not enough cash');
    }

    this.cash -= amount;

    return amount;
  }

  public addCash(amount: number): void {
    this.cash += amount;
  }

  public getTotalAmount(): number {
    return this.getCashAmount()
      + this.getCards().reduce(
        (sum, card) => sum + card.getAmount(),
        0
      );
  }
}
