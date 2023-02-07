import BookItem from "../Catalog/Books/BookItem";
import Member from "../Users/Users/Member";
import ReservationStatus from "./ReservationStatus";

export default class BookReservation {
  private static currentId: number = 0;
  private readonly _id: number;
  private readonly _createdAt = new Date();
  private _status: ReservationStatus = ReservationStatus.Waiting;

  public constructor(
    private readonly _item: BookItem,
    private readonly _member: Member,
  ) {
    this._id = ++BookReservation.currentId;
    this.reserve();
  }

  get id(): number {
    return this._id;
  }

  get item(): BookItem {
    return this._item;
  }

  get member(): Member {
    return this._member;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get status(): ReservationStatus {
    return this._status;
  }

  set status(value: ReservationStatus) {
    this._status = value;
  }

  public cancel(): this {
    this.status = ReservationStatus.Canceled;
    this.item.free();

    return this;
  }

  public reserve(): this {
    this.status = ReservationStatus.Waiting;

    if (this.item.isFree) {
      this.item.reserve();
    }

    return this;
  }

  public pending(): this {
    this.status = ReservationStatus.Pending;

    if (this.item.isFree) {
      this.item.reserve();
    }

    return this;
  }
}
