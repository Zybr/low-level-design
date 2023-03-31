import Piece from "./Piece";
import Board from "../Board";
import Box from "../Box";

export default class Knight extends Piece {
  public canMove(board: Board, srcBox: Box, dstBox: Box): boolean {
    return true;
  }
}
