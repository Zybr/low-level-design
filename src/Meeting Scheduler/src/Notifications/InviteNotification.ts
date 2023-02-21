import AbstractNotification from "./AbstractNotification";
import ParticipantStatus from "../Participant/ParticipantStatus";

export default class InviteNotification extends AbstractNotification {
  public accept(): void {
    this.participant.setStatus(ParticipantStatus.ACCEPTED);
  }

  public reject(): void {
    this.participant.setStatus(ParticipantStatus.REJECTED);
  }
}
