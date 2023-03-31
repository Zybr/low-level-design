import Piece from "./Pieces/Piece";

export default class Box {
  private piece: Piece | null = null;

  public hasPiece(): boolean {
    return !!this.getPiece()
  }

  public getPiece(): Piece {
    return this.piece;
  }

  public setPiece(piece: Piece): void {
    if (this.hasPiece()) {
      throw new Error('Box is not free already.');
    }

    this.piece = piece;
  }

  public removePiece(): Piece {
    if (!this.hasPiece()) {
      throw new Error('Box is free already.');
    }

    const piece = this.piece;
    this.piece = null;

    return piece;
  }
}
