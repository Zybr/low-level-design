import Meeting from "./Meeting";
import User from "./Participant/User";

export default class Calendar {
  private meetings: Meeting[] = [];

  public addMeeting(meeting: Meeting): void {
    this.meetings.push(meeting);
  }

  public removeMeeting(meeting: Meeting): void {
    this.meetings = this.meetings.filter(meet => meet !== meeting);
  }

  public getMeetings(): Meeting[] {
    return this.meetings;
  }

  public getUserMeetings(user: User): Meeting[] {
    return this.meetings
      .filter(meeting => meeting.getUserParticipant(user) !== null);
  }
}
