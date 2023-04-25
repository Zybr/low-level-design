import User from "../Auth/Users/User";
import ApplyNotification from "../Notification/ApplyNotification";

export default class JobOpening {
  public constructor(
    private readonly employer: User,
    private readonly company: string,
    private readonly position: string,
  ) {
  }

  public getEmployer(): User {
    return this.employer;
  }

  public getCompany(): string {
    return this.company;
  }

  public getPosition(): string {
    return this.position;
  }

  public apply(worker: User) {
    new ApplyNotification(this.employer, worker, this);
  }
}
