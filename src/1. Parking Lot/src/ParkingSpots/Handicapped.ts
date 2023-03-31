import ParkingSpot from "./ParkingSpot";
import Car from "../Vehicles/Car";

export default class Handicapped extends ParkingSpot {
  public assignVehicle(vehicle: Car): this {
    this.vehicle = vehicle;
    return this;
  }
}
