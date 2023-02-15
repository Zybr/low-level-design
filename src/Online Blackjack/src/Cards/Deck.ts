import Card from "./Card";
import Suit from "./Suit";

export default class Deck {
  private readonly cards: Card[] = []

  public constructor() {
    this.createCards(Suit.HEART);
    this.createCards(Suit.DIAMOND);
    this.createCards(Suit.SPADE);
    this.createCards(Suit.CLUB);
  }

  public getCards(): Card[] {
    return this.cards;
  }

  private createCards(suite: Suit) {
    for (let value = 2; value <= 9; value++) {
      this.cards.push(new Card(suite, value));
    }

    this.cards.push(new Card(suite, 11));

    for (let i = 0; i < 4; i++) {
      this.cards.push(new Card(suite, 10));
    }
  }
}
