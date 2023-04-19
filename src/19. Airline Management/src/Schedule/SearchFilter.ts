import Airport from "../Flight/WayPoint/Airport";

export default class SearchFilter {
  private departureAirport: Airport | null;
  private arrivalAirport: Airport | null;
  private departureDate: Date | null;

  public getDepartureAirport(): Airport | null {
    return this.departureAirport;
  }

  public setDepartureAirport(departureAirport: Airport | null): this {
    this.departureAirport = departureAirport;
    return this;
  }

  public getArrivalAirport(): Airport | null {
    return this.arrivalAirport;
  }

  public setArrivalAirport(arrivalAirport: Airport | null): this {
    this.arrivalAirport = arrivalAirport;
    return this;
  }

  public getDepartureDate(): Date | null {
    return this.departureDate;
  }

  public setDepartureDate(departureDate: Date | null): this {
    this.departureDate = departureDate;
    return this;
  }
}
