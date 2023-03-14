import Piece from "./Piece";
import Board from "../Board";
import Box from "../Box";

export default class Rook extends Piece {
  public canMove(board: Board, srcBox: Box, dstBox: Box): boolean {
    return true;
  }
}
