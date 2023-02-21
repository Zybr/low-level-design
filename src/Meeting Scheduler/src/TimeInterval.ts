export default class TimeInterval {
  public constructor(
    private readonly start: Date,
    private readonly end: Date,
  ) {
    if (start.getTime() > end.getTime()) {
      throw new Error('Invalid interval range');
    }
  }

  public getStart(): Date {
    return this.start;
  }

  public getEnd(): Date {
    return this.end;
  }

  public isIntersecting(time: TimeInterval): boolean {
    const start = this.start.getTime();
    const end = this.end.getTime();
    const tmStart = time.start.getTime();
    const tmEnd = time.end.getTime();

    return this.isInside([start, end], tmStart)
      || this.isInside([start, end], tmEnd)
      || this.isInside([tmStart, tmEnd], start)
      || this.isInside([tmStart, tmEnd], end)
  }

  private isInside([start, end]: [number, number], time: number): boolean {
    return (start <= time) && (time <= end);
  }
}
