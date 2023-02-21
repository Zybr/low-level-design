import Calendar from "./Calendar";
import TimeInterval from "./TimeInterval";
import Room from "./Room";
import User from "./Participant/User";
import Meeting from "./Meeting";
import CancelNotification from "./Notifications/CancelNotification";

export default class Scheduler {
  private readonly calendar = new Calendar();
  private readonly rooms: Room[] = [];

  public getCalendar(): Calendar {
    return this.calendar;
  }

  public createRoom(capacity: number): Room {
    const room = new Room(capacity);
    this.rooms.push(room);
    return room;
  }

  public getFreeRooms(time: TimeInterval, capacity: number = null): Room[] {
    const freeRooms = new Set<Room>(
      this.rooms.filter(
        room => capacity === null || capacity <= room.getCapacity()
      )
    );

    this.calendar
      .getMeetings()
      .filter(meeting => meeting.getTime().isIntersecting(time))
      .forEach(meeting => freeRooms.delete(meeting.getRoom()));

    return Array.from(freeRooms);
  }

  public book(room: Room, time: TimeInterval, users: User[]): Meeting {
    if (!new Set(this.getFreeRooms(time)).has(room)) {
      throw new Error('Room is not available at this time.');
    }

    if (!users.length) {
      throw new Error('Invited users are not defined');
    }

    const meeting = new Meeting(this, room, time);

    for (const user of users) {
      meeting.invite(user);
    }

    this.calendar.addMeeting(meeting);

    return meeting;
  }

  public cancel(meeting: Meeting) {
    this.calendar
      .removeMeeting(meeting);
    meeting
      .getParticipants()
      .forEach(
        participant => participant
          .getUser()
          .notify(new CancelNotification(participant, meeting))
      );
  }
}
