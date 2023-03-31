import Game from "./Game";

export default class GameLog {
  private entries: {
    Player_score: number,
    Dealer_score: number,
    bet: number,
    money: number,
    Player_$: number,
    Dealer_$: number,
  }[] = [];

  public constructor(
    private readonly game: Game
  ) {
  }

  public addResult(): void {
    const dealer = this.game.getDealer();
    const gambler = this.game.getGambler();
    let money: number | string = this.game.getBet();

    if (this.game.getWinner() === dealer) {
      money *= -1
    } else if (this.game.getWinner() === gambler) {
      money *= gambler.getHand().isBlackJak() ? 1.5 : 1;
    } else {
      money = 0;
    }

    this.entries.push({
      Player_score: gambler.getHand().getScore(),
      Dealer_score: dealer.getHand().getScore(),
      bet: this.game.getBet(),
      money,
      Player_$: gambler.getAccount().getMoney(),
      Dealer_$: dealer.getAccount().getMoney(),
    });
  }

  public show() {
    // console.table(this.entries.map(entry => entry).reverse())
  }
}
