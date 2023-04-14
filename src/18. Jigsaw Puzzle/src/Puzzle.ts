import Piece from "./Piece";
import PiecesGenerator from "./PiecesGenerator";

export default class Puzzle {
  private readonly board: Piece[][] = [];
  private readonly freePieces = new Set<Piece>;

  public constructor(
    private readonly width: number,
    private readonly height: number,
  ) {
    new PiecesGenerator()
      .generate(width, height)
      .forEach(row => row.forEach(cell => this.freePieces.add(cell)));
  }

  public getFreePieces(): Piece[] {
    return Array.from(this.freePieces);
  }

  public doesMatch(piece: Piece, row: number, column: number): boolean {
    this.assertIsFree(piece);

    const neighbours = this.getNeighbours(row, column);
    const [top, right, bottom, left] = neighbours;

    if (
      this.isTopLeftCorner(row, column) && (piece.getTopSide().isFlat() && piece.getLeftSide().isFlat())
      || this.isTopRightCorner(row, column) && (piece.getTopSide().isFlat() && piece.getRightSide().isFlat())
      || this.isBottomRightCorner(row, column) && (piece.getBottomSide().isFlat() && piece.getRightSide().isFlat())
      || this.isBottomLeftCorner(row, column) && (piece.getBottomSide().isFlat() && piece.getLeftSide().isFlat())
    ) {
      return true;
    }

    if (!neighbours.filter(piece => !!piece).length) {
      return false;
    }

    return !(
      (top && !top.getBottomSide().doesMatch(piece.getTopSide()))
      || (right && !right.getLeftSide().doesMatch(piece.getRightSide()))
      || (bottom && !bottom.getTopSide().doesMatch(piece.getBottomSide()))
      || (left && !left.getRightSide().doesMatch(piece.getLeftSide()))
    );
  }

  public insertPiece(piece: Piece, row: number, column: number) {
    if (!this.doesMatch(piece, row, column)) {
      throw new Error("Piece doesn't match");
    }

    this.board[row] = this.board[row] || []
    this.board[row][column] = piece;

    this.freePieces.delete(piece);
  }

  public isCompleted(): boolean {
    return this.getFreePieces().length === 0;
  }

  private assertIsFree(piece: Piece) {
    if (!this.freePieces.has(piece)) {
      throw new Error('The piece is not free');
    }
  }

  private isTopLeftCorner(row: number, column: number): boolean {
    return row === 0 && column === 0;
  }

  private isTopRightCorner(row: number, column: number): boolean {
    return row === 0 && column === this.width - 1;
  }

  private isBottomRightCorner(row: number, column: number): boolean {
    return row === this.height - 1 && column === this.width - 1;
  }

  private isBottomLeftCorner(row: number, column: number): boolean {
    return row === this.height - 1 && column === 0;
  }

  private getNeighbours(row: number, column: number): Piece[] {
    const pieces: Piece[] = [];

    pieces.push(this.getPiece(row - 1, column));
    pieces.push(this.getPiece(row, column + 1));
    pieces.push(this.getPiece(row + 1, column));
    pieces.push(this.getPiece(row, column - 1));

    return pieces;
  }

  private getPiece(row: number, column: number): Piece | null {
    return (this.board[row] && this.board[row][column])
      ? this.board[row][column]
      : null;
  }
}
