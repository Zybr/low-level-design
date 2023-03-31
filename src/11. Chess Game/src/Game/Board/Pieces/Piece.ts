import Color from "../Color";
import Board from "../Board";
import Box from "../Box";

export default abstract class Piece {
  public constructor(
    private readonly color: Color
  ) {
  }

  public getColor(): Color {
    return this.color;
  }

  public abstract canMove(board: Board, srcBox: Box, dstBox: Box): boolean;
}
