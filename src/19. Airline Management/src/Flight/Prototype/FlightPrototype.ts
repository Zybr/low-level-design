import Aircraft from "../Aircraft/Aircraft";
import WayPoint from "../WayPoint/WayPoint";
import { SeatClass } from "../Aircraft/SeatClass";
import Crew from "../Crew";
import Flight from "../Flight";

export default class FlightPrototype {
  public constructor(
    private readonly aircraft: Aircraft,
    private readonly departure: WayPoint,
    private readonly arrival: WayPoint,
    private readonly seatPrices: Map<SeatClass, number>
  ) {
  }

  public getAircraft(): Aircraft {
    return this.aircraft;
  }

  public setAircraft(aircraft: Aircraft) {
    return this.aircraft;
  }

  public getDeparture(): WayPoint {
    return this.departure;
  }

  public setDeparture(departure: WayPoint) {
    return this.departure;
  }

  public getArrival(): WayPoint {
    return this.arrival;
  }

  public setArrival(arrival: WayPoint) {
    return this.arrival;
  }

  public getDuration(): number {
    return this.arrival.getTime().getTime() - this.departure.getTime().getTime();
  }

  public getSeatPrices(): Map<SeatClass, number> {
    return this.seatPrices;
  }

  public setSeatPrices(seatPrice: Map<SeatClass, number>) {
    return this.seatPrices;
  }

  public makeFlight(departureTime: Date, crew: Crew): Flight {
    const departure = this.makeDeparture()
      .setTime(departureTime);
    const arrival = this.makeArrival()
      .setTime(new Date(departureTime.getTime() + this.getDuration()));

    return new Flight(
      this.aircraft,
      crew,
      arrival,
      departure,
      this.getSeatPrices()
    );
  }

  private makeDeparture(): WayPoint {
    return new WayPoint(
      this.cloneTime(this.departure.getTime()),
      this.departure.getAirport()
    )
  }

  private makeArrival(): WayPoint {
    return new WayPoint(
      this.cloneTime(this.arrival.getTime()),
      this.arrival.getAirport()
    )
  }

  private cloneTime(time: Date): Date {
    return new Date(time.getTime());
  }
}
