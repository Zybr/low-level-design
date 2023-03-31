import User from "./User";
import ParticipantStatus from "./ParticipantStatus";

export default class Participant {
  private status: ParticipantStatus = ParticipantStatus.NOT_RESPONDED;

  public constructor(
    private readonly user: User,
  ) {
  }

  public getUser(): User {
    return this.user;
  }

  public setStatus(status: ParticipantStatus): void {
    this.status = status;
  }

  public getStatus(): ParticipantStatus {
    return this.status;
  }
}
