import Piece from "./Piece";
import Side from "./Side";
import { Edge } from "./Edge";

export default class PiecesGenerator {
  private matrix: Piece[][] = [];

  public generate(width: number, height: number): Piece[][] {
    for (let r = 0; r < height; r++) {
      this.matrix[r] = [];
      for (let c = 0; c < width; c++) {
        const top = this.makeOppositeSide(this.getPiece(r - 1, c)?.getBottomSide());
        const left = this.makeOppositeSide(this.getPiece(r, c - 1)?.getRightSide());
        const right = c === width - 1 ? this.makeFlatSide() : this.makeConnectingSide();
        const bottom = r === height - 1 ? this.makeFlatSide() : this.makeConnectingSide();
        this.matrix[r][c] = new Piece([top, right, bottom, left]);
      }
    }
    const pieces = this.matrix;
    this.matrix = [];

    return pieces;
  }

  private makeOppositeSide(side: Side | null): Side {
    if (!side) {
      return this.makeFlatSide();
    }

    if (side.isFlat()) {
      throw new Error('There is no opposite side for flat one');
    }

    return new Side(
      side.getEdge() === Edge.Extrusion ? Edge.Indentation : Edge.Extrusion,
      -1 * side.getShape()
    );
  }

  private makeConnectingSide(): Side {
    return (Math.random() > 0.5)
      ? new Side(
        Edge.Indentation,
        Math.random()
      )
      : new Side(
        Edge.Extrusion,
        -Math.random()
      );
  }

  private makeFlatSide(): Side {
    return new Side(Edge.Flat);
  }

  private getPiece(row: number, column: number): Piece | null {
    return (this.matrix[row] && this.matrix[row][column])
      ? this.matrix[row][column]
      : null;
  }
}
