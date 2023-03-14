import Board from "./Board/Board";
import Position from "./Board/Position";
import King from "./Board/Pieces/King";

// TODO: implement real rule controls
export default class MoveController {
  public constructor(
    private readonly board: Board,
  ) {
  }

  public isValid(srcPosition: Position, dstPosition: Position): boolean {
    if (!this.board.getBox(srcPosition).hasPiece()) {
      return false;
    }

    return this.board.getBox(dstPosition).getPiece()?.getColor()
      !== this.board.getBox(srcPosition).getPiece().getColor();
  }

  public isCheckmate(): boolean {
    const boxes = this.board.getBoxes();
    let kingsNum = 0;

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (boxes[y][x].getPiece() instanceof King) {
          if (++kingsNum === 2) {
            return false;
          }
        }
      }
    }

    return true;
  }

  public isStalemate(): boolean {
    return false;
  }
}
