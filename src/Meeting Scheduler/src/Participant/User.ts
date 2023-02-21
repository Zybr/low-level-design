import AbstractNotification from "../Notifications/AbstractNotification";
import InviteNotification from "../Notifications/InviteNotification";
import Meeting from "../Meeting";
import ParticipantStatus from "./ParticipantStatus";
import CancelNotification from "../Notifications/CancelNotification";

export default class User {
  private readonly notifications: AbstractNotification[] = [];

  public constructor(
    private readonly username: string
  ) {
  }

  public getUsername(): string {
    return this.username;
  }

  public getInvites(): InviteNotification[] {
    return (this.notifications as InviteNotification[])
      .filter(notification => notification instanceof InviteNotification);
  }

  public getCancels(): CancelNotification[] {
    return (this.notifications as CancelNotification[])
      .filter(notification => notification instanceof CancelNotification);
  }

  public notify(notification: AbstractNotification): void {
    this.notifications.push(notification);
  }

  public attend(meeting: Meeting): void {
    meeting.getUserParticipant(this)
      .setStatus(ParticipantStatus.ATTENDED);
  }
}
