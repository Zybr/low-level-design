import Deck from "./Deck";
import Card from "./Card";

export default class Shoe {
  private readonly cards: Card[] = [];
  private inx: 0;

  public constructor(decksNum: number) {
    if (decksNum < 1) {
      throw new Error('Invalid decks number');
    }

    for (let i = 0; i < decksNum; i++) {
      this.cards.push(...(new Deck().getCards()));
    }
  }

  public getTopCard(): Card | null {
    return this.cards[this.inx++] || null;
  }

  /** TC: O(n); SC: O(1) */
  public shuffle() {
    this.inx = 0;
    let pos = this.cards.length - 1;

    while (pos > 0) {
      let inx = Math.floor(Math.random() * pos--);
      this.swapCards(inx, pos);
    }
  }

  private swapCards(inxA: number, inxB: number) {
    const buf = this.cards[inxA];
    this.cards[inxA] = this.cards[inxB];
    this.cards[inxB] = buf;
  }
}
