export default class Period {
  public constructor(
    private readonly start: Date,
    private readonly end: Date
  ) {
    if (start.getTime() >= end.getTime()) {
      throw new Error("Start date can't be later end time.")
    }
  }

  public getStart(): Date {
    return this.start;
  }

  public getEnd(): Date {
    return this.end;
  }

  public getLength(): number {
    return (this.end.getTime() - this.start.getTime()) / 1000 / 60 / 60;
  }

  public isFeature(): boolean {
    return new Date().getTime() < this.start.getTime();
  }
}
