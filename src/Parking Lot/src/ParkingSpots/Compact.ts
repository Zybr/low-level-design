import ParkingSpot from "./ParkingSpot";
import Car from "../Vehicles/Car";

export default class Compact extends ParkingSpot {
  public assignVehicle(vehicle: Car): this {
    this.vehicle = vehicle;
    return this;
  }
}
