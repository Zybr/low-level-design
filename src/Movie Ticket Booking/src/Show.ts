import Cinema from "./Cinema/Cinema";
import Hall from "./Cinema/Hall";
import Booking from "./Booking";
import User from "./Persons/User";
import AbstractSeat from "./Cinema/AbstractSeat";
import GoldSeat from "./Cinema/GoldSeat";
import PlatinumSeat from "./Cinema/PlatinumSeat";
import Ticket from "./Ticket";
import CanceledNotification from "./Notifications/CanceledNotification";
import Movie from "./Movie/Movie";

export default class Show {
  private readonly GOLD_RATE = 1.5;
  private readonly PLATINUM_RATE = 2;
  private readonly bookings = new Map<number, Booking>();

  public constructor(
    private readonly cinema: Cinema,
    private readonly hall: Hall,
    private readonly movie: Movie,
    private readonly startTime: Date,
    private readonly cost: number,
  ) {
  }

  public getCinema(): Cinema {
    return this.cinema;
  }

  public getHall(): Hall {
    return this.hall;
  }

  public getMovie(): Movie {
    return this.movie;
  }

  public getStartTime(): Date {
    return this.startTime;
  }

  public getSilverCost(): number {
    return this.cost;
  }

  public getGoldCost(): number {
    return Math.round(this.cost * this.GOLD_RATE);
  }

  public getPlatinumCost(): number {
    return this.cost * this.PLATINUM_RATE;
  }

  public getFreeSeats(): AbstractSeat[] {
    return this.getHall()
      .getSeats()
      .filter(seat => !this.bookings.has(seat.getNum()));
  }

  public book(user: User, seat: AbstractSeat): Booking {
    if (seat.getHall() !== this.hall) {
      throw new Error('Set is not correct');
    }

    if (this.bookings.has(seat.getNum())) {
      throw new Error('Seat is already booked');
    }

    let cost = this.getSilverCost();

    if (seat instanceof GoldSeat) {
      cost = this.getGoldCost();
    } else if (seat instanceof PlatinumSeat) {
      cost = this.getPlatinumCost();
    }

    const booking = new Booking(user, cost, this, seat);

    this.bookings.set(seat.getNum(), booking)

    return booking;
  }

  public cancelBooking(ticket: Ticket): void {
    const booking = ticket.getBooking();

    if (!booking.isConfirmed()) {
      throw new Error('Booking is not confirmed');
    }

    if (
      booking.getShow() !== this
      || !this.bookings.has(booking.getSeat().getNum())
    ) {
      throw new Error('Booking is not defined');
    }

    this.bookings.delete(booking.getSeat().getNum());

    booking
      .getUser()
      .addMoney(
        booking
          .getPayment()
          .refund()
          .getMoney()
      );

    new CanceledNotification(booking.getUser(), booking).send();
  }

  public cancel(): void {
    this.bookings
      .forEach(
        booking => {
          booking
            .getUser()
            .addMoney(
              booking
                .getPayment()
                .refund()
                .getMoney()
            );
          new CanceledNotification(
            booking.getUser(),
            booking
          )
            .send()
        }
      );

    this.getCinema()
      .removeShow(this);
  }
}
