import { Edge } from "./Edge";

export default class Side {
  public constructor(
    private readonly edge: Edge,
    private readonly shape: number = 0,
  ) {
  }

  public getEdge(): Edge {
    return this.edge;
  }

  public isIndentation() {
    return this.edge === Edge.Indentation;
  }

  public isExtrusion() {
    return this.edge === Edge.Extrusion;
  }

  public isFlat() {
    return this.edge === Edge.Flat;
  }

  public getShape(): number {
    return this.shape;
  }

  public doesMatch(side: Side): boolean {
    if (
      this.isFlat()
      || side.isFlat()
      || this.getEdge() === side.getEdge()
    ) {
      return false;
    }

    return (this.getShape() + side.getShape()) === 0;
  }
}
