import Box from "./Box";
import Position from "./Position";
import Piece from "./Pieces/Piece";
import Color from "./Color";
import Bishop from "./Pieces/Bishop";
import King from "./Pieces/King";
import Knight from "./Pieces/Knight";
import Pawn from "./Pieces/Pawn";
import Queen from "./Pieces/Queen";
import Rook from "./Pieces/Rook";

export default class Board {
  private readonly boxes: Box[][] = [];

  private readonly positions = {
    [Color.White]: {
      0: [Rook.name, Knight.name, Bishop.name, Queen.name, King.name, Bishop.name, King.name, Rook.name],
      1: [Pawn.name, Pawn.name, Pawn.name, Pawn.name, Pawn.name, Pawn.name, Pawn.name, Pawn.name],
    },
    [Color.Black]: {
      6: [Pawn.name, Pawn.name, Pawn.name, Pawn.name, Pawn.name, Pawn.name, Pawn.name, Pawn.name],
      7: [Rook.name, Knight.name, Bishop.name, Queen.name, King.name, Bishop.name, King.name, Rook.name],
    }
  }

  public constructor() {
    this.createBoard();
    this.createPieces();
  }

  public getBoxes(): Box[][] {
    return this.boxes;
  }

  public move(srcPosition: Position, dstPosition: Position): Piece {
    if (!this.getBox(srcPosition).hasPiece()) {
      throw new Error("Source position doesn't contain piece");
    }

    const piece = this.remove(srcPosition);
    let removedPiece = null;

    if (this.getBox(dstPosition).hasPiece()) {
      const dstPiece = this.getBox(dstPosition).getPiece();

      if (piece.getColor() === dstPiece.getColor()) {
        throw new Error('Piece is removing a piece with the same color');
      }

      removedPiece = this.remove(dstPosition);
    }

    this.getBox(dstPosition).setPiece(piece);

    return removedPiece;
  }

  public remove(position: Position): Piece {
    return this.getBox(position).removePiece();
  }

  public getBox(position): Box {
    return this.boxes[position.y][position.x];
  }

  private createBoard(): void {
    for (let y = 0; y < 8; y++) {
      this.boxes[y] = [];
      for (let x = 0; x < 8; x++) {
        this.boxes[y][x] = new Box();
      }
    }
  }

  private createPieces(): void {
    for (let color in this.positions) {
      const rows = this.positions[color];

      for (const y in rows) {
        const row = rows[y];

        for (const x in row) {
          const type = row[x];
          this.createPiece(type, +color as unknown as Color, new Position(+y, +x))
        }
      }
    }
  }

  private createPiece(type: string, color: Color, position: Position): void {
    const types = {
      [Bishop.name]: Bishop,
      [King.name]: King,
      [Knight.name]: Knight,
      [Pawn.name]: Pawn,
      [Queen.name]: Queen,
      [Rook.name]: Rook,
    };

    this.boxes[position.y][position.x].setPiece(new types[type](color));
  }
}
