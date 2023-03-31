import Room from "./Hotel/Room/Room";
import Service from "./Services/Service";
import Payment from "./Payments/Payment";
import Guest from "./Authorizatoin/Users/Guest";
import ReservationNotification from "./Notifications/ReservationNotification";
import CancelingNotification from "./Notifications/CancelingNotification";

export default class Booking {
  private services: Service[] = [];
  private readonly payments: Payment[] = [];
  private checkInDate: Date;
  private checkOutDate: Date;

  public constructor(
    private readonly guest: Guest,
    private readonly room: Room,
    checkInDate: Date,
    checkOutDate: Date,
  ) {
    this.setPeriod(checkInDate, checkOutDate);
  }

  public getRoom(): Room {
    return this.room;
  }

  public getServices(): Service[] {
    return this.services;
  }

  public setServices(services: Service[]): void {
    this.services = services;
  }

  public getPrepaymentCost(): number {
    return this.getOneDayCost();
  }

  public getRestPaymentCost(): number {
    return (this.getDuration() - 1) * this.getOneDayCost();
  }

  public confirm(payment: Payment): void {
    if (this.payments[0]) {
      throw new Error('Booking is already confirmed');
    }

    if (!payment.isPayed()) {
      throw new Error('Payment is not payed');
    }

    if (payment.getAmount() !== this.getPrepaymentCost()) {
      throw new Error('Payment amount is not correct');
    }

    this.payments.push(payment);
    this.room.reserve();
    new ReservationNotification(this).send(this.guest);
  }

  public pay(payment: Payment): void {
    if (this.payments[1]) {
      throw new Error('Booking is already fully payed');
    }

    if (!payment.isPayed()) {
      throw new Error('Payment is not payed');
    }

    if (payment.getAmount() !== this.getRestPaymentCost()) {
      throw new Error('Payments amount is not correct');
    }

    this.payments.push(payment);
    this.room.checkIn();
  }

  public cancel(): void {
    if (!this.room.isReserved()) {
      throw new Error("Not reserved booking can't be canceled");
    }

    const prePayment = this.payments[0];
    this.guest.addMoney(prePayment.getAmount());
    prePayment.refund();

    this.room.free();
    new CancelingNotification(this).send(this.guest);
  }

  public isActive(): boolean {
    return this.room.isReserved() || this.room.isCheckedIn();
  }

  public getDuration(): number {
    return Math.ceil(
      (this.checkOutDate.getTime() - this.checkInDate.getTime())
      / (1000 * 60 * 60 * 24)
    );
  }

  private getOneDayCost(): number {
    return this.room.getRate() + this.services.reduce(
      (sum, service) => sum + service.getRate(),
      0
    );
  }

  private setPeriod(star: Date, end: Date): void {
    if (star.getTime() >= end.getTime()) {
      throw new Error('Period is not valid');
    }

    this.checkInDate = star;
    this.checkOutDate = end;
  }
}
