export default class Period {
  public constructor(
    private readonly start: Date,
    private readonly end: Date,
  ) {
    if (start.getTime() >= end.getTime()) {
      throw new Error('Invalid period');
    }
  }

  public getStart(): Date {
    return this.start;
  }

  public getEnd(): Date {
    return this.end;
  }
}
