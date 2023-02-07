import BookItem from "../Catalog/Books/BookItem";
import Member from "../Users/Users/Member";
import Payment from "./Payment";
import Config from "../Config";

export default class BookLend {
  private readonly _createdAt = new Date();
  private _dueDate: Date;
  private _returnedAt: Date | null = null;
  private _payment: Payment | null = null;

  public constructor(
    private _item: BookItem,
    private _member: Member,
  ) {
    this.item.loan();
    this.resetDueDate()
    this.member.increaseLendBookNum();
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get item(): BookItem {
    return this._item;
  }

  get member(): Member {
    return this._member;
  }

  get payment(): Payment | null {
    return this._payment;
  }

  set payment(value: Payment | null) {
    this._payment = value;
  }

  get returnedAt(): Date | null {
    return this._returnedAt;
  }

  get overdueDays(): number {
    const doneDate = this._returnedAt || this.getCurrentDate();

    return Math.round((doneDate.getTime() - this._dueDate.getTime()) / 1000 / 60 / 60 / 24);
  }

  public renew(): this {
    return this.resetDueDate();
  }

  public done(): this {
    this.item.free();
    this.member.decreaseLendBookNum();
    this._returnedAt = this.getCurrentDate();

    return this;
  }

  private resetDueDate(): this {
    this._dueDate = this.getCurrentDate();
    this._dueDate.setDate(this._dueDate.getDate() + Config.MAX_LEND_DAYS);

    return this;
  }

  private getCurrentDate(): Date {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }
}
