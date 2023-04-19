import FlightPrototype from "./FlightPrototype";
import Aircraft from "../Aircraft/Aircraft";
import WayPoint from "../WayPoint/WayPoint";
import Airport from "../WayPoint/Airport";
import { SeatClass } from "../Aircraft/SeatClass";

export default class FlightPrototypesCatalog {
  private readonly prototypes: FlightPrototype[] = [];

  public createPrototype(aircraft: Aircraft, departure: WayPoint, arrival: WayPoint, seatPrices: Map<SeatClass, number>) {
    const prototype = new FlightPrototype(
      aircraft,
      departure,
      arrival,
      seatPrices
    )

    this.prototypes.push(prototype);

    return prototype;
  }

  public getPrototypes(): FlightPrototype[] {
    return this.prototypes;
  }

  public getWayPrototype(departureAirport: Airport, arrivalAirport: Airport): FlightPrototype[] {
    return this.prototypes.filter(
      proto =>
        proto.getDeparture().getAirport() === departureAirport
        && proto.getArrival().getAirport() === arrivalAirport
    )
  }
}
