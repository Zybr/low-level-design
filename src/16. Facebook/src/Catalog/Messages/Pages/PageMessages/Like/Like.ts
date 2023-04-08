import { LikeType } from "./LikeType";

export default class Like {
  public constructor(
    private readonly type: LikeType
  ) {
  }

  public isUp(): boolean {
    return this.type === LikeType.Up;
  }

  public isDown(): boolean {
    return this.type === LikeType.Down;
  }
}
