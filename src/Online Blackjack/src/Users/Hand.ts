import Card from "../Cards/Card";

export default class Hand {
  private readonly MAX_SCORE = 21;
  private cards: Card[] = [];

  public constructor(
    private readonly maxScore: number,
  ) {
  }

  public isBlackJak(): boolean {
    return this.getScore() === this.MAX_SCORE;
  }

  public isFull(): boolean {
    return this.getScore() >= this.maxScore;
  }

  public isOverflowed(): boolean {
    return this.getScore() > this.MAX_SCORE;
  }

  public addCard(card: Card) {
    this.cards.push(card);
  }

  public getScore(): number {
    return this.cards.reduce(
      (score, card) => score + card.getValue(),
      0
    )
  }

  public clear() {
    this.cards = [];
  }
}
