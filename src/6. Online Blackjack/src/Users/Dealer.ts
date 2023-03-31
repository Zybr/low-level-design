import AbstractPlayer from "./AbstractPlayer";
import Game from "../Game";
import Gambler from "./Gambler";
import Person from "./Person";

export default class Dealer extends AbstractPlayer {
  public constructor(
    person: Person,
    username: string,
    password: string
  ) {
    super(
      person,
      username,
      password,
    )
    this.setStrategy((player, game) => {
      while (
        player.getHand().getScore() < game.getGambler().getHand().getScore()
        && player.getHand().getScore() < 16
        && !player.getHand().isOverflowed()
        ) {
        game.hit(player);
      }

      game.stand(player);
    })
  }

  public createGame(gambler: Gambler): Game {
    return new Game(this, gambler);
  }

  protected getMaxScore(): number {
    return 17;
  }
}
