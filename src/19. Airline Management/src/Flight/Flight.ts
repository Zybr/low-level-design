import { FlightStatus } from "./FlightStatus";
import Aircraft from "./Aircraft/Aircraft";
import Crew from "./Crew";
import WayPoint from "./WayPoint/WayPoint";
import { SeatClass } from "./Aircraft/SeatClass";
import Airline from "../Airline";

export default class Flight {
  private status: FlightStatus = FlightStatus.Active;

  public constructor(
    private readonly aircraft: Aircraft,
    private readonly crew: Crew,
    private readonly departure: WayPoint,
    private readonly arrival: WayPoint,
    private readonly seatPrice: Map<SeatClass, number>
  ) {
  }

  public getAircraft(): Aircraft {
    return this.aircraft;
  }

  public getCrew(): Crew {
    return this.crew;
  }

  public getDeparture(): WayPoint {
    return this.departure;
  }

  public getArrival(): WayPoint {
    return this.arrival;
  }

  public getSeatPrice(): Map<SeatClass, number> {
    return this.seatPrice;
  }

  public isPending(): boolean {
    return new Date().getTime() < this.departure.getTime().getTime();
  }

  public isActive(): boolean {
    const now = new Date().getTime();

    return this.departure.getTime().getTime() <= now && now <= this.arrival.getTime().getTime();
  }

  public isCompleted(): boolean {
    const now = new Date().getTime();
    return this.arrival.getTime().getTime() < now;
  }

  public cancel() {
    if (!this.isPending()) {
      throw new Error('Only pending flight can be canceled');
    }

    this.status = FlightStatus.Canceled;

    Airline.getInstance()
      .getItinerariesCatalog()
      .getFlightReservations(this)
      .forEach(rsv => rsv.cancel());
  }
}
