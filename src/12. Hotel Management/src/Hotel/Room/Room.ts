import Hotel from "../Hotel";
import RoomType from "./RoomType";
import RoomStatus from "./RoomStatus";
import Key from "../../Keys/Key";
import System from "../../System";

export default class Room {
  private static currentId = 0;

  public readonly id: number;
  private opened = false;
  private status: RoomStatus = RoomStatus.Free;

  public constructor(
    private readonly hotel: Hotel,
    private readonly type: RoomType,
  ) {
    this.id = ++Room.currentId;
  }

  public getHotel(): Hotel {
    return this.hotel;
  }

  public isOpened(): boolean {
    return this.opened;
  }

  public open(key: Key) {
    if (!key.doesFit(this)) {
      throw new Error("Key doesn't fit to room");
    }
    this.opened = true;
  }

  public close(key: Key) {
    if (!key.doesFit(this)) {
      throw new Error("Key doesn't fit to room");
    }
    this.opened = false;
  }

  public getType(): RoomType {
    return this.type;
  }

  public getStatus(): RoomStatus {
    return this.status;
  }

  public isFree(): boolean {
    return this.status === RoomStatus.Free;
  }

  public isReserved(): boolean {
    return this.status === RoomStatus.Reserved;
  }

  public isCheckedIn(): boolean {
    return this.status === RoomStatus.CheckedIn;
  }

  public isCheckedOut(): boolean {
    return this.status === RoomStatus.CheckedOut;
  }

  public free(): void {
    this.status = RoomStatus.Free;
  }

  public reserve(): void {
    this.status = RoomStatus.Reserved;
  }

  public checkIn(): void {
    this.status = RoomStatus.CheckedIn;
  }

  public checkOut(): void {
    this.status = RoomStatus.CheckedOut;
  }

  public clean(): void {
    if (!this.isOpened()) {
      throw new Error('Room is not opened to be cleaned');
    }

    this.status = RoomStatus.Free;
  }

  public getRate(): number {
    return System.getInstance()
      .getPriceList()
      .getRoomTypeCost(this.type);
  }
}
