import BookReservation from "./BookReservation";
import BookItem from "../Catalog/Books/BookItem";
import Member from "../Users/Users/Member";
import ReservationStatus from "./ReservationStatus";

export default class ReservationList {
  private reservations: BookReservation[] = [];

  public getWaitingReservation(item: BookItem, member: Member): BookReservation | null {
    return this.getWaitingReservations(item)
      .find(reservation => reservation.member === member);
  }

  public getWaitingReservations(item: BookItem): BookReservation[] {
    return this
      .sortId(
        this.reservations
          .filter(reservation => reservation.status === ReservationStatus.Waiting)
          .filter(reservation => reservation.item === item)
      );
  }

  public reserve(item: BookItem, member: Member): BookReservation {
    const reservation = new BookReservation(item, member);
    this.reservations.push(reservation);

    return reservation;
  }

  public unreserve(item: BookItem, member: Member): BookReservation | null {
    return this.getWaitingReservation(item, member)?.cancel() || null;
  }

  private sortId(items: BookReservation[], asc = true) {
    return items.sort(
      (reservationA, reservationB) =>
        (asc ? 1 : -1) * (reservationA.id - reservationB.id)
    );
  }
}
