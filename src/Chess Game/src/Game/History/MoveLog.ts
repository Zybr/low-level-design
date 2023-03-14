import Player from "../../Auth/Player";
import Piece from "../Board/Pieces/Piece";
import Position from "../Board/Position";

export default class MoveLog {
  public constructor(
    private readonly player: Player,
    private readonly piece: Piece,
    private readonly srcPosition: Position,
    private readonly dstPosition: Position,
    private readonly removedPiece: Piece = null
  ) {
  }

  public getPlayer(): Player {
    return this.player;
  }

  public getPiece(): Piece {
    return this.piece;
  }

  public getSourcePosition(): Position {
    return this.srcPosition;
  }

  public getDestinationPosition(): Position {
    return this.dstPosition;
  }

  public getRemovedPiece(): Piece {
    return this.removedPiece;
  }
}
