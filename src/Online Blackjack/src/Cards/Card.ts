import Suit from "./Suit";

export default class Card {
  public constructor(
    private readonly suite: Suit,
    private readonly value: number,
  ) {
  }

  public getSuite(): Suit {
    return this.suite;
  }

  public getValue(): number {
    return this.value;
  }
}
