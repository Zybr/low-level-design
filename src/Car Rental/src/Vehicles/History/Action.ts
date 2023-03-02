import ActionType from "./ActionType";

export default class Action {
  private readonly time = new Date();

  public constructor(
    private readonly type: ActionType,
  ) {
  }

  public getTime(): Date {
    return this.time;
  }

  public getType(): ActionType {
    return this.type;
  }
}
