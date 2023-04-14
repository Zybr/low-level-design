import Side from "./Side";

export default class Piece {
  public constructor(
    private readonly sides: [Side, Side, Side, Side],
  ) {
  }

  public getSides(): Side[] {
    return this.sides;
  }

  public getTopSide(): Side {
    return this.sides[0];
  }

  public getRightSide(): Side {
    return this.sides[1];
  }

  public getBottomSide(): Side {
    return this.sides[2];
  }

  public getLeftSide(): Side {
    return this.sides[3];
  }

  public isCorner(): boolean {
    return this.getFlatSides().length === 2
  }

  public isEdge(): boolean {
    return this.getFlatSides().length === 1;
  }

  public isMiddle(): boolean {
    return this.getFlatSides().length === 0;
  }

  private getFlatSides(): Side[] {
    return this.getSides()
      .filter(side => side.isFlat())
  }
}
