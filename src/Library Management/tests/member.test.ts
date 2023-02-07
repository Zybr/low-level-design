import Library from "../src/Library";
import Member from "../src/Users/Users/Member";
import { makeItem, makeLibrarian, makeMember } from "./utils";
import ReservationStatus from "../src/Reservation/ReservationStatus";
import BookItem from "../src/Catalog/Books/BookItem";

describe('Member', () => {
  let library: Library;
  let memberA: Member;
  let memberB: Member;
  let item: BookItem;

  beforeEach(() => {
    library = new Library();
    makeLibrarian(library);
    memberA = makeMember(library, 'member-A');
    memberB = makeMember(library, 'member-B');
    item = makeItem(library);
  })

  test('Reserve item', () => {
    const reservation = memberA.reserveItem(item);

    expect(reservation.member).toEqual(memberA);
    expect(reservation.item).toEqual(item);
    expect(reservation.status).toEqual(ReservationStatus.Waiting);
  });

  test('Cancel reservation', () => {
    let reservationA = memberA.reserveItem(item);
    memberB.reserveItem(item);
    memberA.cancelReservation(item);

    expect(reservationA.status).toEqual(ReservationStatus.Canceled);

    const notification = memberB.person.emailBox.getNotifications()[0]
    expect(notification).not.toBeUndefined();
    expect(notification.getContent()).toContain('is available');
  });

  test('Lend item', () => {
    const lend = memberA.lendItem(item);

    expect(lend.member).toEqual(memberA);
    expect(lend.item).toEqual(item);
    expect(lend.overdueDays).toEqual(-15);

    expect(memberA.getLendBookNum()).toEqual(1);

    expect(memberB.lendItem(item)).toBeNull();
  });

  test('Return book', () => {
    const lend = memberA.lendItem(item);
    memberB.reserveItem(item);
    memberA.returnItem(item);

    expect(memberA.getLendBookNum()).toEqual(0)
    expect(lend.item.isFree).toBeTruthy();

    const notification = memberB.person.emailBox.getNotifications()[0];
    expect(notification).not.toBeUndefined();
    expect(notification.getContent()).toContain('is available');
  });
});
