export default class Position {
  private readonly _y: number;
  private readonly _x: number;

  public constructor(
    y: number,
    x: number,
  ) {
    if (
      y < 0 || 7 < y
      || x < 0 || 7 < x
    ) {
      throw new Error(`Position coordinates ${y}:${x} are not valid.`);
    }
    this._y = y;
    this._x = x;
  }

  public get y(): number {
    return this._y;
  }

  public get x(): number {
    return this._x;
  }
}
