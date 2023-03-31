import EndType from "./EndType";
import Player from "../../Auth/Player";

export default class EndLog {
  public constructor(
    private readonly reason: EndType,
    private readonly winner: Player = null,
  ) {
  }

  public getReason(): EndType {
    return this.reason;
  }

  public getWinner(): Player | null {
    return this.winner;
  }
}
