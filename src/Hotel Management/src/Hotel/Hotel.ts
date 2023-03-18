import Address from "./Address";
import Receptionist from "../Authorizatoin/Users/Servants/Receptionist";
import Housekeeper from "../Authorizatoin/Users/Servants/Housekeeper";
import Room from "./Room/Room";
import RoomType from "./Room/RoomType";
import KeyRack from "./KeyRack";
import RoomKey from "../Keys/RoomKey";
import Manager from "../Authorizatoin/Users/Servants/Manager";

export default class Hotel {
  private rooms: Room[] = [];
  private readonly keyRack = new KeyRack();
  private readonly managers = new Set<Manager>();
  private readonly receptionists = new Set<Receptionist>();
  private readonly housekeepers = new Set<Housekeeper>();

  public constructor(
    private readonly name: string,
    private readonly address: Address,
  ) {
  }

  public getName(): string {
    return this.name;
  }

  public getAddress(): Address {
    return this.address;
  }

  public removeRoom(room: Room): void {
    if (room.getHotel() !== this) {
      throw new Error("Room's hotel is not the current one");
    }

    this.rooms = this.rooms.filter(r => r !== room);
  }

  public getRooms(): Room[] {
    return this.rooms;
  }

  public createRoom(type: RoomType): Room {
    const room = new Room(this, type);
    const key = new RoomKey(room);
    this.rooms.push(room);
    this.keyRack.putKey(key);

    return room;
  }

  public getKeyRack(): KeyRack {
    return this.keyRack;
  }

  public addManager(manager: Manager): void {
    this.managers.add(manager);
  }

  public getManagers(): Manager[] {
    return Array.from(this.managers);
  }

  public addReceptionist(receptionist: Receptionist): void {
    this.receptionists.add(receptionist);
  }

  public getReceptionists(): Receptionist[] {
    return Array.from(this.receptionists.values());
  }

  public addHousekeeper(housekeeper: Housekeeper): void {
    housekeeper.setKey(this.keyRack.popMasterKey());
    this.housekeepers.add(housekeeper);
  }

  public getHousekeepers(): Housekeeper[] {
    return Array.from(this.housekeepers.values());
  }
}
