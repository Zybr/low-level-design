import Account from "./Account";
import DisplayBoard from "../ParkingLot/DisplayBoard";
import Entrance from "../ParkingLot/Entrance";
import ParkingLot from "../ParkingLot";
import Compact from "../ParkingSpots/Compact";
import Handicapped from "../ParkingSpots/Handicapped";
import Large from "../ParkingSpots/Large";
import Moto from "../ParkingSpots/Moto";
import Exit from "../ParkingLot/Exit";

export default class Admin extends Account {
  public addCompactSpot(): Compact {
    return ParkingLot.getInstance().createCompactSpot();
  }

  public addHandicappedSpot(): Handicapped {
    return ParkingLot.getInstance().createHandicappedSpot();
  }

  public addLargeSpot(): Large {
    return ParkingLot.getInstance().createLargeSpot();
  }

  public addMotoSpot(): Moto {
    return ParkingLot.getInstance().createMotoSpot();
  }

  public addDisplayBoard(): DisplayBoard {
    return ParkingLot.getInstance().createBoard();
  }

  public addEntrance(): Entrance {
    return ParkingLot.getInstance().createEntrance();
  }

  public addExit(): Exit {
    return ParkingLot.getInstance().createExit();
  }
}
