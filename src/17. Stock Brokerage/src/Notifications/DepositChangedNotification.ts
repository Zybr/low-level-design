import Notification from "./Notification";
import Member from "../Auth/Users/Member/Member";

export default class DepositChangedNotification extends Notification {
  public constructor(
    receiver: Member,
    private readonly change: number,
    private readonly result: number,
  ) {
    super(receiver);
  }

  public getChange(): number {
    return this.change;
  }

  public getResult(): number {
    return this.result;
  }
}
