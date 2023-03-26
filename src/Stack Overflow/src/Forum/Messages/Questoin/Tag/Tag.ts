export default class Tag {
  private rate: number = 0;

  public constructor(
    private readonly name: string
  ) {
  }

  public getName(): string {
    return this.name;
  }

  public getRate(): number {
    return this.rate;
  }

  public incrementRate(): void {
    this.rate++;
  }
}
