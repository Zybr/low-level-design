export default class OpeningFilter {
  private company: string | null;
  private position: string | null;

  public getCompany(): string {
    return this.company;
  }

  public setCompany(company: string): this {
    this.company = company;
    return this;
  }

  public getPosition(): string {
    return this.position;
  }

  public setPosition(position: string): this {
    this.position = position;
    return this;
  }
}
