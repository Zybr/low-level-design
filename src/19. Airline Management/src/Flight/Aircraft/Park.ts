import Aircraft from "./Aircraft";

export default class Park {
  private readonly aircrafts = new Set<Aircraft>();

  public getAircrafts(): Aircraft[] {
    return Array.from(this.aircrafts);
  }

  public addAircraft(aircraft: Aircraft) {
    this.aircrafts.add(aircraft);
  }

  public removeAircraft(aircraft: Aircraft) {
    this.aircrafts.delete(aircraft);
  }
}
