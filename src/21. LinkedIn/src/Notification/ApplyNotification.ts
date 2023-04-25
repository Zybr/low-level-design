import AbstractNotification from "./AbstractNotification";
import User from "../Auth/Users/User";
import JobOpening from "../Job/JobOpening";

export default class ApplyNotification extends AbstractNotification {
  public constructor(
    receiver: User,
    private readonly worker: User,
    private readonly opening: JobOpening,
  ) {
    super(receiver);
  }

  public getWorker(): User {
    return this.worker;
  }

  public getOpening(): JobOpening {
    return this.opening;
  }
}
