export default class Period {
  public constructor(
    private readonly start: Date,
    private readonly end: Date
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

  public isGoing(): boolean {
    const time = new Date();
    return this.start.getTime() <= time.getTime()
      && time.getTime() <= this.end.getTime();
  }

  public isStarted(): boolean {
    return this.start.getTime() <= new Date().getTime();
  }

  public isEnded(): boolean {
    return new Date().getTime() > this.end.getTime();
  }

  public includes(time: Date): boolean {
    return this.start.getTime() <= time.getTime()
      && time.getTime() <= this.end.getTime();
  }

  public intersect(period: Period): boolean {
    return this.includes(period.start)
      || this.includes(period.end)
      || period.includes(period.start)
      || period.includes(period.end);
  }
}
