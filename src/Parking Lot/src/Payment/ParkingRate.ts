export default class ParkingRate {
  public constructor(
    private hours: number,
    private rate: number,
  ) {
  }

  public calculate(hours: number): number {
    return this.rate * this.hours * hours;
  }
}
