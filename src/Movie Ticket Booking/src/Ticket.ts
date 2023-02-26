import Booking from "./Booking";

export default class Ticket {
  private readonly id: number;
  private static currentId = 0;

  public constructor(
    private readonly booking: Booking
  ) {
    this.id = ++Ticket.currentId;
  }

  public getId(): number {
    return this.id;
  }

  public getBooking(): Booking {
    return this.booking;
  }
}
