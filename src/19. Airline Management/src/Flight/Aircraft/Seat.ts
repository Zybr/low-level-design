import { SeatClass } from "./SeatClass";

export default class Seat {
  public constructor(
    private readonly num: number,
    private readonly seatClass: SeatClass
  ) {
  }

  public getNum(): number {
    return this.num;
  }

  public getClass(): SeatClass {
    return this.seatClass;
  }
}
