import Piece from "./Piece";
import Board from "../Board";
import Box from "../Box";

export default class Pawn extends Piece {
  public canMove(board: Board, srcBox: Box, dstBox: Box): boolean {
    return true;
  }
}
