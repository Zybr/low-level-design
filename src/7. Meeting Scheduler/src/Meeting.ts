import Scheduler from "./Scheduler";
import Room from "./Room";
import TimeInterval from "./TimeInterval";
import Participant from "./Participant/Participant";
import User from "./Participant/User";
import InviteNotification from "./Notifications/InviteNotification";
import CancelNotification from "./Notifications/CancelNotification";

export default class Meeting {
  private readonly participants: Participant[] = [];

  public constructor(
    private readonly scheduler: Scheduler,
    private readonly room: Room,
    private readonly time: TimeInterval,
  ) {
  }

  public getRoom(): Room {
    return this.room;
  }

  public getTime(): TimeInterval {
    return this.time;
  }

  public getParticipants(): Participant[] {
    return this.participants;
  }

  public getUserParticipant(user: User): Participant | null {
    return this.participants
      .find(participant => participant.getUser() === user) || null;
  }

  public invite(user: User): void {
    const participant = new Participant(user);
    this.participants.push(participant);
    new InviteNotification(participant, this).send();
  }

  public cancel(): void {
    this.scheduler.cancel(this);
  }
}
