import Room from "../Hotel/Room/Room";
import RoomsFilter from "./RoomsFilter";

export default class Catalog {
  private readonly rooms = new Set<Room>;

  public add(room: Room): void {
    this.rooms.add(room);
  }

  public remove(room: Room): void {
    this.rooms.delete(room);
  }

  public getCheckedOut(): Room[] {
    return Array.from(this.rooms).filter(room => room.isCheckedOut());
  }

  public search(filter: RoomsFilter = null) {
    return Array.from(this.rooms).filter(room => {
      if (!room.isFree()) {
        return false;
      }

      if (filter) {
        if (filter.hotel && filter.hotel !== room.getHotel()) {
          return false;
        }

        if (filter.types && !filter.types.includes(room.getType())) {
          return false;
        }

        if (filter.costMin !== null && room.getRate() < filter.costMin) {
          return false;
        }

        if (filter.costMax !== null && room.getRate() > filter.costMax) {
          return false;
        }
      }

      return true;
    });
  }
}
