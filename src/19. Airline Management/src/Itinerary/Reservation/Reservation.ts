import Flight from "../../Flight/Flight";
import Seat from "../../Flight/Aircraft/Seat";
import Payment from "../Payment/Payment";
import Customer from "../../Authorization/Users/Customer/Customer";
import { PassengerSeats } from "../PassengerSeats";
import Airline from "../../Airline";
import ReservingNotification from "../../Notification/ReservingNotification";
import CancelingNotification from "../../Notification/CancelingNotification";

export default class Reservation {
  private canceled: boolean = false;
  private payment: Payment | null;

  public constructor(
    private readonly customer: Customer,
    private readonly flight: Flight,
    private readonly passengerSeats: PassengerSeats,
  ) {
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getFlight(): Flight {
    return this.flight;
  }

  public getSeats(): Seat[] {
    return Array.from(this.passengerSeats.values());
  }

  public getCost(): number {
    return Array.from(this.getSeats())
      .reduce(
        (sum, seat) => sum + this.flight.getSeatPrice().get(seat.getClass()),
        0
      )
  }

  public isConfirmed(): boolean {
    return !!this.payment;
  }

  public isCanceled(): boolean {
    return this.canceled;
  }

  public cancel() {
    if (this.isCanceled()) {
      throw new Error("Reservation is already canceled");
    }

    if (!this.getFlight().isPending()) {
      throw new Error("Only pending reservation can be canceled");
    }

    if (this.isConfirmed()) {
      this.payment.refund();
    }

    new CancelingNotification(this.customer, this);
    this.canceled = true;
  }

  public confirm() {
    if (this.isConfirmed()) {
      throw new Error('Reservation is already confirmed');
    }

    if (this.flight.isCompleted()) {
      throw new Error("Reservation of completed flight can't be completed");
    }

    if (!this.hasOnlyFreeSeats()) {
      throw new Error('Some of seats are already reserved');
    }

    this.payment = new Payment(this.getCustomer(), this.getCost()).pay()
    new ReservingNotification(this.customer, this);
  }

  private hasOnlyFreeSeats(): boolean {
    const freeSeats = new Set(
      Airline.getInstance()
        .getItinerariesCatalog()
        .getFreeSeats(this.flight)
    );

    return this.getSeats()
      .every(seat => freeSeats.has(seat));
  }
}
