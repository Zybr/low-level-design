import Key from "./Key";
import Room from "../Hotel/Room/Room";
import Hotel from "../Hotel/Hotel";

export default class MasterKey extends Key {
  public constructor(
    private readonly hotel: Hotel
  ) {
    super();
  }

  public doesFit(room: Room): boolean {
    return room.getHotel() === this.hotel;
  }
}
