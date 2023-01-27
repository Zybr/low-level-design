import ParkingSpot from "./ParkingSpot";
import Motorcycle from "../Vehicles/Motorcycle";

export default class Moto extends ParkingSpot {
  public assignVehicle(vehicle: Motorcycle): this {
    this.vehicle = vehicle;
    return this;
  }
}
