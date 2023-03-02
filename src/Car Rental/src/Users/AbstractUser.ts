import Person from "./Person";
import UserStatus from "./UserStatus";
import Messenger from "../Notifications/Messenger";
import Reservation from "../Reservation/Reservation";
import AbstractVehicle from "../Vehicles/AbstractVehicle";
import Period from "../Reservation/Period";
import RentalBranch from "../RentalBranch";

export default abstract class AbstractUser {
  private status: UserStatus = UserStatus.ACTIVE;
  private messenger = new Messenger();
  private readonly reservations: Reservation[] = [];

  public constructor(
    private readonly person: Person,
    private readonly username: string,
    private password: string
  ) {
  }

  public getCurrentReservation(): Reservation | null {
    const reservation = this.reservations[this.reservations.length - 1];

    return reservation && !reservation.isDone() && !reservation.isCanceled() ? reservation : null;
  }

  public getPerson(): Person {
    return this.person;
  }

  public getUsername(): string {
    return this.username;
  }

  public resetPassword(currentPassword: string, newPassword) {
    if (currentPassword !== this.password) {
      throw new Error('Current password is not correct');
    }

    this.password = newPassword;
  }

  public isValidPassword(password: string): boolean {
    return this.password === password;
  }

  public isActive(): boolean {
    return this.status === UserStatus.ACTIVE;
  }

  public cancel() {
    this.status = UserStatus.CANCELED;
  }

  public makeReservation(
    vehicle: AbstractVehicle<any>,
    period: Period,
    startBranch: RentalBranch,
    endBranch: RentalBranch,
  ): Reservation {
    if (this.getCurrentReservation()) {
      throw new Error('There is not finished reservation');
    }

    const reservation = new Reservation(
      this,
      vehicle,
      period,
      startBranch,
      endBranch
    );
    this.reservations.push(reservation);

    return reservation;
  }
}
