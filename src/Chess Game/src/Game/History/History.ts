import Log from "./Log";
import Player from "../../Auth/Player";
import Piece from "../Board/Pieces/Piece";
import Position from "../Board/Position";
import MoveLog from "./MoveLog";
import EndLog from "./EndLog";
import EndType from "./EndType";

export default class History {
  private readonly logs: Log[] = [];

  public getLogs(): Log[] {
    return this.logs;
  }

  public move(
    player: Player,
    piece: Piece,
    srcPosition: Position,
    dstPosition: Position,
    removedPiece: Piece = null
  ): void {
    this.logs.push(
      new MoveLog(
        player,
        piece,
        srcPosition,
        dstPosition,
        removedPiece
      )
    )
  }

  public checkmate(winner: Player): void {
    this.logs.push(new EndLog(
      EndType.Checkmate,
      winner
    ));
  }

  public stalemate(): void {
    this.logs.push(new EndLog(
      EndType.Stalemate
    ));
  }

  public forfeiture(winner: Player): void {
    this.logs.push(new EndLog(
      EndType.Forfeiture,
      winner
    ))
  }

  public resign(winner: Player): void {
    this.logs.push(new EndLog(
      EndType.Resign,
      winner
    ));
  }
}
