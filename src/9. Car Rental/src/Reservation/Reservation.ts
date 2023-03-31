import AbstractVehicle from "../Vehicles/AbstractVehicle";
import AbstractService from "../Services/AbstractService";
import AbstractEquipment from "../Equipments/AbstractEquipment";
import Period from "./Period";
import RentalBranch from "../RentalBranch";
import AbstractPayment from "../Payments/AbstractPayment";
import AbstractUser from "../Users/AbstractUser";
import RentalSystem from "../RentalSystem";
import Fine from "../Payments/Fine";
import ReservationStatus from "./ReservationStatus";

export default class Reservation {
  private status: ReservationStatus = ReservationStatus.PENDING
  private vehicle: AbstractVehicle<any>;
  private readonly services = new Set<AbstractService>();
  private readonly equipments = new Set<AbstractEquipment>();
  private period: Period;
  private startBranch: RentalBranch;
  private endBranch: RentalBranch;
  private payment: AbstractPayment;
  private deactivationTime: Date | null = null;
  private fine: Fine | null = null;

  public constructor(
    private readonly user: AbstractUser,
    vehicle: AbstractVehicle<any>,
    period: Period,
    startBranch: RentalBranch,
    endBranch: RentalBranch,
  ) {
    this
      .setVehicle(vehicle)
      .setPeriod(period)
      .setStartBranch(startBranch)
      .setEndBranch(endBranch)
  }

  public getUser(): AbstractUser {
    return this.user;
  }

  public getVehicle(): AbstractVehicle<any> {
    return this.vehicle;
  }

  public setVehicle(vehicle: AbstractVehicle<any>): this {
    this.assertChangeable();
    this.vehicle = vehicle;

    return this;
  }

  public getServices(): AbstractService[] {
    return Array.from(this.services);
  }

  public setServices(services: AbstractService[]): this {
    this.assertChangeable();
    services.forEach(service => this.services.add(service))

    return this;
  }

  public getEquipments(): AbstractEquipment[] {
    return Array.from(this.equipments);
  }

  public setEquipments(equipments: AbstractEquipment[]): this {
    this.assertChangeable();
    equipments.forEach(equipment => this.equipments.add(equipment))

    return this;
  }

  public setPeriod(period: Period): this {
    this.assertChangeable();
    if (!period.isFeature()) {
      throw new Error('Reservation can be defined only for the future time');
    }

    this.period = period;

    return this;
  }

  public getStartBranch(): RentalBranch {
    return this.startBranch;
  }

  public setStartBranch(branch: RentalBranch): this {
    this.assertChangeable();
    this.startBranch = branch;

    return this;
  }

  public getEndBranch(): RentalBranch {
    return this.endBranch;
  }

  public setEndBranch(branch: RentalBranch): this {
    this.assertChangeable();
    this.endBranch = branch;

    return this;
  }

  public isPending(): boolean {
    return this.status === ReservationStatus.PENDING;
  }

  public isConfirmed(): boolean {
    return this.status === ReservationStatus.CONFIRMED;
  }

  public isCanceled(): boolean {
    return this.status === ReservationStatus.CANCELED;
  }

  public isActivated(): boolean {
    return this.status === ReservationStatus.ACTIVATED;
  }

  public isDeactivated(): boolean {
    return this.status === ReservationStatus.DEACTIVATED;
  }

  public isFined(): boolean {
    return this.status === ReservationStatus.FINED;
  }

  public isDone(): boolean {
    return this.status === ReservationStatus.DONE;
  }

  public getCost(): number {
    return this.period.getLength() * (
      this.vehicle.getPrice()
      + this.getServices().reduce((cost, service) => cost + service.getPrice(), 0)
      + this.getEquipments().reduce((cost, equipment) => cost + equipment.getPrice(), 0)
    );
  }

  public getFine(): Fine | null {
    return this.fine;
  }

  public confirm(payment: AbstractPayment): this {
    if (!this.isPending()) {
      throw new Error("Reservation can't be confirmed");
    }

    if (this.getCost() !== payment.getAmount() || !payment.isPayed()) {
      throw new Error('Payment is not applied');
    }

    this.payment = payment;
    this.startBranch.getFreeStalls()[0].setVehicle(this.vehicle);
    this.vehicle.setFree(false);
    this.status = ReservationStatus.CONFIRMED;

    return this;
  }

  public activate(): this {
    if (!this.isConfirmed()) {
      throw new Error("Reservation can't be activated");
    }

    this.status = ReservationStatus.ACTIVATED;

    return this;
  }

  public deactivate(): this {
    if (!this.isActivated()) {
      throw new Error("Reservation can't be deactivated");
    }

    this.deactivationTime = new Date();
    this.status = ReservationStatus.DEACTIVATED;

    const overdueTime = new Date().getTime() - this.period.getEnd().getTime();

    if (overdueTime > 0) {
      this.fine = new Fine(
        this,
        overdueTime * RentalSystem.getInstance().getFineRate()
      );
      this.status = ReservationStatus.FINED;
    } else {
      this.done();
    }

    return this;
  }

  public done(): this {
    if (
      !this.isDeactivated()
      || this.isFined()
    ) {
      throw new Error("Reservation can't be done")
    }

    this.status = ReservationStatus.DONE;

    return this;
  }

  public cancel(): this {
    if (!this.isPending() && !this.isConfirmed()) {
      throw new Error("Reservation can't be canceled");
    }

    if (this.isConfirmed()) {
      this.payment.refund();
      this.user
        .getPerson()
        .addMoney(this.payment.getAmount());
    }

    this.status = ReservationStatus.CANCELED;

    return this;
  }

  private assertChangeable() {
    if (!this.isPending()) {
      throw new Error("Reservation can't be changed");
    }
  }
}

