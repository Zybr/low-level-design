import Customer from "../Authorization/Users/Customer/Customer";
import Reservation from "./Reservation/Reservation";
import Flight from "../Flight/Flight";
import { PassengerSeats } from "./PassengerSeats";
import Ticket from "./Reservation/Ticket";

export default class Itinerary {
  private readonly reservations = new Set<Reservation>();
  private tickets: Ticket[] = [];

  public constructor(
    private readonly customer: Customer,
  ) {
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getReservations(): Reservation[] {
    return Array.from(this.reservations);
  }

  public hasFlight(flight: Flight): boolean {
    return this.getReservations()
      .some(reservation => reservation.getFlight() === flight);
  }

  public getTickets(): Ticket[] {
    return this.tickets;
  }

  public createReservation(flight: Flight, passengerSeats: PassengerSeats): Reservation {
    const reservation = new Reservation(
      this.getCustomer(),
      flight,
      passengerSeats
    )

    this.reservations.add(reservation);

    return reservation;
  }

  public getCost(): number {
    return this.getReservations()
      .reduce(
        (sum, reservation) => sum + reservation.getCost(),
        0
      );
  }

  public confirm() {
    if (this.isEmpty()) {
      throw new Error("Empty itinerary can't be confirmed");
    }

    if (this.isCompleted()) {
      throw new Error("Completed itinerary can't be confirmed");
    }

    this.getReservations()
      .forEach(rsv => rsv.confirm())

    this.makeTickets();
  }

  public isPending(): boolean {
    return this.getReservations()
      .every(rsv => rsv.getFlight().isPending());
  }

  public isActive(): boolean {
    return this.getReservations()
      .some(rsv => rsv.getFlight().isActive());
  }

  public isCompleted(): boolean {
    return this.getReservations()
      .every(reservation => reservation.getFlight().isCompleted());
  }

  private isEmpty(): boolean {
    return !this.getReservations().length;
  }

  private makeTickets() {
    this.tickets = this.getReservations()
      .map(reservation => new Ticket(reservation));
  }
}
