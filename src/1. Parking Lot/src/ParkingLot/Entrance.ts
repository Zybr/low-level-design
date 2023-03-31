import Ticket from "../Payment/Ticket";
import Entity from "./Entity";
import Vehicle from "../Vehicles/Vehicle";
import ParkingLot from "../ParkingLot";
import Car from "../Vehicles/Car";
import Compact from "../ParkingSpots/Compact";
import Large from "../ParkingSpots/Large";
import Truck from "../Vehicles/Truck";
import Van from "../Vehicles/Van";
import Motorcycle from "../Vehicles/Motorcycle";
import Moto from "../ParkingSpots/Moto";

export default class Entrance extends Entity {
  public getTicket(vehicle: Vehicle): Ticket {
    const spot = ParkingLot
      .getInstance()
      .getSpots()
      .find(spot => spot.isFree() && spot instanceof Entrance.getSpotType(vehicle))

    if (!spot) {
      throw new Error('There are not free spots');
    }

    spot.assignVehicle(vehicle);

    return new Ticket(this, spot);
  }

  private static getSpotType(vehicle: Vehicle) {
    if (vehicle instanceof Car) {
      return Compact;
    }

    // TODO: add Handicapped

    if (
      vehicle instanceof Van
      || vehicle instanceof Truck
    ) {
      return Large;
    }

    if (vehicle instanceof Motorcycle) {
      return Moto;
    }
  }
}
