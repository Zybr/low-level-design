export default class Period {
  constructor(
    private readonly start: Date,
    private readonly end: Date,
  ) {
    if (start.getTime() >= end.getTime()) {
      throw new Error('Period is not valid')
    }
  }

  public getStart(): Date {
    return this.start;
  }

  public getEnd(): Date {
    return this.end;
  }
}
