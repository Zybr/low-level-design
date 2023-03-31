import Entity from "../ParkingLot/Entity";
import Entrance from "../ParkingLot/Entrance";
import Exit from "../ParkingLot/Exit";
import Payment from "./Payments/Payment";
import ParkingSpot from "../ParkingSpots/ParkingSpot";

export default class Ticket extends Entity {
  private startTime: Date;
  private endTime?: Date = null;
  private exit?: Exit = null;
  private payment?: Payment = null;

  public constructor(
    private readonly entrance: Entrance,
    private readonly spot: ParkingSpot,
  ) {
    super();
    this.startTime = new Date();
  }

  public close(
    exit: Exit,
    payment: Payment
  ): this {
    this.exit = exit;
    this.payment = payment;
    this.endTime = new Date();
    this.spot.discharge();
    return this;
  }

  public getEntrance(): Entrance {
    return this.entrance;
  }

  public getExit(): Exit | null {
    return this.exit;
  }

  public getSpot(): ParkingSpot {
    return this.spot;
  }

  public getDuration(): number {
    return (
      (this.endTime || new Date()).getTime()
      - this.startTime.getTime()
    ) / 1000 / 60 / 60;
  }

  public isClosed(): boolean {
    return !!this.payment;
  }
}
