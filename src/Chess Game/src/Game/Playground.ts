import Game from "./Game";
import Player from "../Auth/Player";

export default class Playground {
  private readonly games: Game[] = []

  public createGame(playerA: Player, playerB: Player): Game {
    const game = new Game(playerA, playerB);
    this.games.push(game);

    return game;
  }

  public getGames(): Game[] {
    return this.games;
  }

  public getActiveGames(): Game[] {
    return this.games.filter(game => game.isActive());
  }
}
