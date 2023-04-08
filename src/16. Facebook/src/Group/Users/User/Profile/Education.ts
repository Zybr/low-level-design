import Period from "./Period";

export default class Education {
  private constructor(
    private period: Period,
    private school: string,
    private degree: string,
  ) {
  }

  public getPeriod(): Period {
    return this.period;
  }

  public getSchool(): string {
    return this.school;
  }

  public getDegree(): string {
    return this.degree;
  }

  public setSchool(school: string) {
  }

  public setDegree(degree: string) {
  }
}
