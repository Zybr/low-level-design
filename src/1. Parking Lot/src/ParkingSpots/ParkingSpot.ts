import Entity from "../ParkingLot/Entity";
import Vehicle from "../Vehicles/Vehicle";

export default abstract class ParkingSpot extends Entity {
  protected vehicle: Vehicle = null;

  public abstract assignVehicle(vehicle: Vehicle): this;

  public getVehicle(): Vehicle {
    return this.vehicle;
  }

  public discharge(): this {
    this.vehicle = null
    return this;
  }

  public isFree(): boolean {
    return this.vehicle === null;
  }
}
