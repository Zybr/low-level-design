import Room from "./Room/Room";
import RoomKey from "../Keys/RoomKey";
import Key from "../Keys/Key";
import MasterKey from "../Keys/MasterKey";

export default class KeyRack {
  private readonly roomKeys = new Map<Room, RoomKey>();
  private readonly masterKeys: MasterKey[] = [];

  public hasKey(room): boolean {
    return this.roomKeys.has(room);
  }

  public popRoomKey(room: Room): RoomKey {
    if (!this.hasKey(room)) {
      throw new Error('There is no key of room');
    }

    const key = this.roomKeys.get(room);
    this.roomKeys.delete(room);

    return key;
  }

  public popMasterKey(): MasterKey {
    if (this.masterKeys.length === 0) {
      throw new Error('There is no master keys');
    }

    return this.masterKeys.pop();
  }

  public putKey(key: Key): void {
    if (key instanceof RoomKey) {
      if (this.roomKeys.has(key.getRoom())) {
        throw new Error('Room key is already put');
      }
      this.roomKeys.set(key.getRoom(), key);
    } else if (key instanceof MasterKey) {
      if (this.masterKeys.includes(key)) {
        throw new Error('Master key is already put');
      }
      this.masterKeys.push(key)
    } else {
      throw new Error('Not expected type of key');
    }
  }
}
