import { BadgeType } from "./BadgeType";

export default class Badge {
  public constructor(
    private readonly type: BadgeType,
  ) {
  }

  public getType(): BadgeType {
    return this.type;
  }
}
