import User from "./User";
import Account from "./Account";
import Hand from "./Hand";
import Game from "../Game";

interface Strategy {
  (player: AbstractPlayer, game: Game): void
}

export default abstract class AbstractPlayer extends User {
  private readonly account = new Account();
  private readonly hand = new Hand(this.getMaxScore());
  private strategy: Strategy | null = null;

  public getAccount(): Account {
    return this.account;
  }

  public getHand(): Hand {
    return this.hand;
  }

  public setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  public play(game: Game) {
    if (!this.strategy) {
      throw new Error('Strategy is not defined');
    }

    this.strategy(this, game);
  }

  protected abstract getMaxScore(): number;
}
