import Airport from "./Airport";

export default class WayPoint {
  public constructor(
    private time: Date,
    private readonly airport: Airport,
  ) {
  }

  public getTime(): Date {
    return this.time;
  }

  public setTime(time: Date) {
    this.time = time;

    return this;
  }

  public getAirport(): Airport {
    return this.airport;
  }
}
