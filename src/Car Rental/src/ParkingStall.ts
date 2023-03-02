import AbstractUser from "./Users/AbstractUser";
import AbstractVehicle from "./Vehicles/AbstractVehicle";

export default class ParkingStall {
  private vehicle: AbstractVehicle<any> | null = null;

  public isFree(): boolean {
    return !this.vehicle;
  }

  public setVehicle(vehicle: AbstractVehicle<any>) {
    if (!this.isFree()) {
      throw new Error('Stall is not free');
    }

    this.vehicle = vehicle;
  }

  public getVehicle(): AbstractVehicle<any> {
    return this.vehicle;
  }

  public dropVehicle(user: AbstractUser) {
    const reservation = user.getCurrentReservation();

    if (!reservation?.isActivated()) {
      throw new Error("User doesn't have active vehicle");
    }

    this.vehicle = reservation.getVehicle();
    this.vehicle.setFree(true);
    reservation.deactivate();
  }

  public pickupVehicle(user: AbstractUser): AbstractVehicle<any> {
    if (user.getCurrentReservation()?.getVehicle() !== this.vehicle) {
      throw new Error("User dont have access to the vehicle");
    }

    user.getCurrentReservation().activate();
    const vehicle = this.vehicle;
    this.vehicle.setFree(false);
    this.vehicle = null;

    return vehicle;
  }
}
