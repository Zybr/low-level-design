import User from "./User";
import Game from "../Game/Game";
import Color from "../Game/Board/Color";
import System from "../System";

interface Strategy {
  (player: Player): void
}

export default class Player extends User {
  private game: Game | null = null;
  private color: Color | null = null;
  private score = 0;
  private strategy: Strategy = () => {
  };

  public incrementScore(): void {
    this.score++;
  }

  public getScore(): number {
    return this.score;
  }

  public createGame(opponent: Player): Game {
    return System.getInstance()
      .getPlayground()
      .createGame(this, opponent);
  }

  public joinGame(game: Game, color: Color): void {
    if (this.game) {
      throw new Error('Player is already joined game');
    }

    this.game = game;
    this.color = color;
  }

  public getGame(): Game | null {
    return this.game;
  }

  public getColor(): Color | null {
    return this.color;
  }

  public leaveGame(): void {
    this.assertJoinedGame();

    if (this.game.isActive()) {
      this.game.forfeiture(this);
    }

    this.game = null;
    this.color = null;
  }

  public resign(): void {
    this.assertJoinedGame();
    this.game.resign(this);
  }

  public setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  public handleChange(): void {
    this.strategy(this);
  }

  private assertJoinedGame(): void {
    if (!this.game) {
      throw new Error('Player is not joined game yet');
    }
  }
}
