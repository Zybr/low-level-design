import ParkingSpot from "./ParkingSpot";
import Van from "../Vehicles/Van";
import Truck from "../Vehicles/Truck";

export default class Large extends ParkingSpot {
  public assignVehicle(vehicle: Van | Truck): this {
    this.vehicle = vehicle;
    return this;
  }
}
