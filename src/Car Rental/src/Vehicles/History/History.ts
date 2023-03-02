import ActionType from "./ActionType";
import Action from "./Action";

export default class History {
  private readonly actions: Action[] = [];

  public log(type: ActionType) {
    this.actions.push(new Action(type));
  }

  public getActions(): Action[] {
    return this.actions;
  }
}
