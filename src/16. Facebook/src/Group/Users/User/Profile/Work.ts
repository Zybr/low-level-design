import Period from "./Period";

export default class Work {
  public constructor(
    private readonly period: Period,
    private readonly company: string,
    private readonly position: string
  ) {
  }

  public getPeriod(): Period {
    return this.period;
  }

  public getCompany(): string {
    return this.company;
  }

  public getPosition(): string {
    return this.position;
  }

  public setPeriod(period: Period) {
  }

  public setCompany(company: string) {
  }

  public setPosition(position: string) {
  }
}
