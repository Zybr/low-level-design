import Period from "./Period";

export default class Work {
  public constructor(
    private period: Period,
    private company: string,
    private position: string,
  ) {
  }


  public setPeriod(period: Period) {
    this.period = period;
  }

  public gtPeriod(): Period {
    return this.period;
  }

  public setCompany(company: string) {
    this.company = company;
  }

  public gtCompany(): string {
    return this.company;
  }

  public setPosition(position: string) {
    this.position = position;
  }

  public gtPosition(): string {
    return this.position;
  }
}
