import Compact from "../ParkingSpots/Compact";
import Handicapped from "../ParkingSpots/Handicapped";
import Large from "../ParkingSpots/Large";
import Moto from "../ParkingSpots/Moto";
import Entity from "./Entity";
import ParkingLot from "../ParkingLot";

export default class DisplayBoard extends Entity {
  public getCompactCount(): number {
    return ParkingLot.getInstance()
      .getSpots()
      .filter(spot => spot instanceof Compact && spot.isFree())
      .length;
  }

  public getHandicappedCount(): number {
    return ParkingLot.getInstance()
      .getSpots()
      .filter(spot => spot instanceof Handicapped && spot.isFree())
      .length;
  }

  public getLargeCount(): number {
    return ParkingLot.getInstance()
      .getSpots()
      .filter(spot => spot instanceof Large && spot.isFree())
      .length;
  }

  public getMotoCount(): number {
    return ParkingLot.getInstance()
      .getSpots()
      .filter(spot => spot instanceof Moto && spot.isFree())
      .length;
  }
}
