import AbstractPlayer from "./AbstractPlayer";

export default class Gambler extends AbstractPlayer {
  protected getMaxScore(): number {
    return 21;
  }
}
