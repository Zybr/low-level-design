import Scheduler from "../src/Scheduler";
import TimeInterval from "../src/TimeInterval";
import User from "../src/Participant/User";
import { faker } from "@faker-js/faker";
import Room from "../src/Room";

const makeInterval = (startHours: number, endHours: number): TimeInterval => {
  const start = new Date();
  start.setHours(startHours);
  start.setMinutes(0);
  start.setSeconds(0);
  start.setMilliseconds(0);

  const end = new Date();
  end.setHours(endHours);
  end.setMinutes(0);
  end.setSeconds(0);
  end.setMilliseconds(0);

  return new TimeInterval(start, end);
}

describe('Scheduler', () => {
  let scheduler: Scheduler;
  let rooms: Room[];
  let users: User[];

  beforeEach(() => {
    scheduler = new Scheduler();
    rooms = [
      scheduler.createRoom(3),
      scheduler.createRoom(4),
      scheduler.createRoom(5),
    ];
    users = [
      new User(faker.internet.userName()),
      new User(faker.internet.userName()),
      new User(faker.internet.userName()),
    ];
  })

  test('getFreeRooms() - filter by capacity', () => {
    const rooms = scheduler.getFreeRooms(makeInterval(0, 24), 4);

    expect(rooms.map(room => room.getCapacity()))
      .toEqual([4, 5]);

    expect(scheduler.getCalendar().getMeetings())
      .toHaveLength(0);
  });

  test('getFreeRooms() - filter by free time', () => {
    scheduler.book(rooms[0], makeInterval(12, 13), [users[0]]);
    scheduler.book(rooms[2], makeInterval(16, 17), [users[0]]);

    expect(scheduler.getFreeRooms(makeInterval(13, 16)))
      .toEqual([rooms[1]])
    expect(scheduler.getFreeRooms(makeInterval(14, 15)))
      .toEqual(rooms)
  });

  test('book()', () => {
    const meeting = scheduler.book(
      rooms[0],
      makeInterval(12, 14),
      [users[0]]
    );
    meeting.invite(users[1]);

    expect(
      meeting
        .getParticipants()
        .map(participant => participant.getUser().getUsername())
    ).toEqual([
      users[0].getUsername(),
      users[1].getUsername()
    ]);
    expect(users[0].getInvites()).toHaveLength(1);
    expect(users[1].getInvites()).toHaveLength(1);
    expect(users[2].getInvites()).toHaveLength(0);

    expect(scheduler.getCalendar().getMeetings())
      .toHaveLength(1);
    expect(scheduler.getCalendar().getUserMeetings(users[0]))
      .toHaveLength(1);
    expect(scheduler.getCalendar().getUserMeetings(users[1]))
      .toHaveLength(1);
    expect(scheduler.getCalendar().getUserMeetings(users[2]))
      .toHaveLength(0);
  });

  test('cancel()', () => {
    const meeting = scheduler.book(
      rooms[0],
      makeInterval(12, 14),
      [users[0]]
    );
    meeting.invite(users[1]);
    meeting.cancel();

    expect(users[0].getCancels()).toHaveLength(1);
    expect(users[1].getCancels()).toHaveLength(1);
    expect(users[2].getCancels()).toHaveLength(0);

    expect(scheduler.getCalendar().getMeetings())
      .toHaveLength(0);
  });
});
