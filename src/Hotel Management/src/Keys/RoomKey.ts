import Key from "./Key";
import Room from "../Hotel/Room/Room";

export default class RoomKey extends Key {
  public constructor(
    private readonly room: Room,
  ) {
    super();
  }

  public doesFit(room: Room): boolean {
    return this.room === room;
  }

  public getRoom(): Room {
    return this.room;
  }
}
