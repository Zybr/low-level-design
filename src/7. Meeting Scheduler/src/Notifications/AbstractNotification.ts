import Meeting from "../Meeting";
import Participant from "../Participant/Participant";

export default abstract class AbstractNotification {
  public constructor(
    protected readonly participant: Participant,
    protected readonly meeting: Meeting,
  ) {
  }

  public getMeeting(): Meeting {
    return this.meeting;
  }

  public send(): void {
    this.participant
      .getUser()
      .notify(this);
  }
}
