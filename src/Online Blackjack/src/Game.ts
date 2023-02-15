import GameLog from "./GameLog";
import Shoe from "./Cards/Shoe";
import AbstractPlayer from "./Users/AbstractPlayer";
import Dealer from "./Users/Dealer";
import Gambler from "./Users/Gambler";

export default class Game {
  private readonly log = new GameLog(this);
  private readonly shoe = new Shoe(3);
  private bet: number = 0;
  private winner: AbstractPlayer | null = null;

  public constructor(
    private readonly dealer: Dealer,
    private readonly gambler: Gambler,
  ) {
  }

  public getLog(): GameLog {
    return this.log;
  }

  public getDealer(): Dealer {
    return this.dealer;
  }

  public getGambler(): Gambler {
    return this.gambler;
  }

  public getWinner(): AbstractPlayer | null {
    return this.winner;
  }

  public play() {
    this.shoe.shuffle();
    this.gambler.getHand().addCard(this.shoe.getTopCard());
    this.gambler.getHand().addCard(this.shoe.getTopCard());
    this.dealer.getHand().addCard(this.shoe.getTopCard());
    this.dealer.getHand().addCard(this.shoe.getTopCard());
    this.gambler.play(this);
  }

  public getBet(): number {
    return this.bet;
  }

  public placeBet(bet: number) {
    this.gambler.getAccount().minusMoney(bet);
    this.bet = bet;
  }

  public hit(player: AbstractPlayer) {
    player.getHand().addCard(this.shoe.getTopCard());
  }

  public stand(player: AbstractPlayer) {
    if (player === this.gambler) {
      if (this.gambler.getHand().isOverflowed()) {
        this.winDealer();
        return;
      }

      this.dealer.play(this);
      return;
    }

    if (this.dealer.getHand().isOverflowed()) {
      this.winGambler();
      return;
    }

    const gamblerScore = this.gambler.getHand().getScore();
    const dealerScore = this.dealer.getHand().getScore();

    if (gamblerScore < dealerScore) {
      this.winDealer();
    } else if (gamblerScore > dealerScore) {
      this.winGambler();
    } else {
      this.tie()
    }
  }

  private tie() {
    this.gambler.getAccount().addMoney(this.bet);
    this.log.addResult();
    this.reset();
  }

  private winGambler() {
    this.winner = this.gambler;
    this.gambler.getAccount().addMoney(this.bet)
    const money = this.bet * (this.gambler.getHand().isBlackJak() ? 1.5 : 1);
    this.dealer.getAccount().minusMoney(money);
    this.gambler.getAccount().addMoney(money);

    this.log.addResult();
    this.reset();
  }

  private winDealer() {
    this.winner = this.dealer;
    this.dealer.getAccount().addMoney(this.bet);

    this.log.addResult();
    this.reset();
  }

  private reset() {
    this.winner = null;
    this.dealer.getHand().clear();
    this.gambler.getHand().clear();
    this.bet = 0;
    this.shoe.shuffle();
  }
}
